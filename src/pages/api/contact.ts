export const prerender = false

import type { APIRoute } from 'astro'
import { createClient } from '@sanity/client'
import {
  isRequired,
  isValidEmail,
  isValidPhoneOrEmail,
  validatePhoneField,
} from '../../utils/formValidation'

const FORM_TYPE_LABELS: Record<string, string> = {
  'request-call': '01 · Request a Free Estimate',
  'request-consultation': '02 · Send Us a Message',
  'request-message-response': '03 · Quick Contact (Sidebar)',
}

function generateRequestId(): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .toUpperCase()
    .padStart(4, '0')
  return `FR-${date}-${rand}`
}

function buildEmailHtml(fields: Record<string, string>, requestId: string, formType: string): string {
  const label = FORM_TYPE_LABELS[formType] ?? formType
  const timestamp = new Date().toLocaleString('en-CA', {
    timeZone: 'America/Vancouver',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const fieldRows = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;white-space:nowrap;border-bottom:1px solid #f0f0f0;width:160px;vertical-align:top;">${k}</td>
        <td style="padding:10px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f0f0f0;vertical-align:top;word-break:break-word;">${v.replace(/\n/g, '<br>')}</td>
      </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Inquiry — Formo Renovations</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f3;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a1a;border-radius:12px 12px 0 0;padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:11px;color:#888;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;">Formo Renovations</div>
                    <div style="font-size:22px;font-weight:700;color:#fff;">New Inquiry Received</div>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <div style="display:inline-block;background:#2a2a2a;border:1px solid #333;border-radius:6px;padding:6px 12px;font-size:12px;color:#ccc;font-family:monospace;">${requestId}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Form type badge -->
          <tr>
            <td style="background:#c8a96e;padding:10px 32px;">
              <span style="font-size:12px;font-weight:700;color:#1a1a1a;letter-spacing:.08em;text-transform:uppercase;">${label}</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#fff;border-radius:0 0 12px 12px;padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${fieldRows}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 0 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#aaa;">Submitted on ${timestamp} (Pacific Time)</p>
              <p style="margin:6px 0 0;font-size:12px;color:#aaa;">Formo Renovations · Victoria &amp; Vancouver Island, BC</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function validateSubmission(formType: string, fields: Record<string, string>): string | null {
  const name = fields.Name ?? ''
  const email = fields.Email ?? fields['Email Address'] ?? ''
  const phone = fields.Phone ?? ''
  const message = fields.Message ?? ''
  const contact = fields['Phone or Email'] ?? ''

  if (formType === 'request-call') {
    if (!isRequired(name)) return 'Name is required'
    const phoneError = validatePhoneField(phone)
    if (phoneError) return phoneError
    if (!isRequired(email) || !isValidEmail(email)) return 'Valid email is required'
    return null
  }

  if (formType === 'request-consultation') {
    if (!isRequired(name)) return 'Name is required'
    if (!isRequired(email) || !isValidEmail(email)) return 'Valid email is required'
    const phoneError = validatePhoneField(phone)
    if (phoneError) return phoneError
    if (!isRequired(message)) return 'Project description is required'
    return null
  }

  if (formType === 'request-message-response') {
    if (!isRequired(name)) return 'Name is required'
    if (!isRequired(contact) || !isValidPhoneOrEmail(contact)) return 'Valid phone or email is required'
    if (!isRequired(message)) return 'Project description is required'
    return null
  }

  return 'Unknown form type'
}

async function getNotificationEmail(): Promise<string> {
  try {
    const client = createClient({
      projectId: '9g3zb5ng',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })
    const doc = await client.fetch<{ notificationEmail?: string }>(
      `*[_id == "siteSettings"][0]{ notificationEmail }`,
    )
    return doc?.notificationEmail?.trim() || ''
  } catch {
    return ''
  }
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { formType, ...rawFields } = body

  if (!formType || !FORM_TYPE_LABELS[formType]) {
    return new Response(JSON.stringify({ ok: false, error: 'Unknown form type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const validationError = validateSubmission(formType, rawFields)
  if (validationError) {
    return new Response(JSON.stringify({ ok: false, error: validationError }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = import.meta.env.BREVO_API_KEY
  const senderEmail = import.meta.env.BREVO_SENDER_EMAIL

  if (!apiKey || !senderEmail) {
    console.error('[contact] BREVO_API_KEY or BREVO_SENDER_EMAIL env vars missing')
    return new Response(JSON.stringify({ ok: false, error: 'Mail service not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const notificationEmail = await getNotificationEmail()
  if (!notificationEmail) {
    console.error('[contact] notificationEmail not set in Sanity siteSettings')
    return new Response(JSON.stringify({ ok: false, error: 'Recipient not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const requestId = generateRequestId()
  const label = FORM_TYPE_LABELS[formType]
  const html = buildEmailHtml(rawFields, requestId, formType)

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Formo Renovations', email: senderEmail },
        to: [{ email: notificationEmail }],
        subject: `[${requestId}] New Inquiry — ${label}`,
        htmlContent: html,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('[contact] Brevo API error:', res.status, errText)
      return new Response(
        JSON.stringify({ ok: false, error: 'Failed to send email', detail: errText }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      )
    }

    return new Response(JSON.stringify({ ok: true, requestId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    console.error('[contact] Fetch error:', detail)
    return new Response(
      JSON.stringify({ ok: false, error: 'Failed to send email', detail }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
