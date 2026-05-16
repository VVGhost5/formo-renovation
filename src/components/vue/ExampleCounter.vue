<script setup lang="ts">
import {ref} from "vue";

const props = withDefaults(
	defineProps<{
		initial?: number;
	}>(),
	{initial: 0},
);

const count = ref(props.initial);

function increment() {
	count.value += 1;
}
</script>

<template>
	<button type="button" class="example-counter" @click="increment">
		Count: {{ count }}
	</button>
</template>

<style scoped lang="scss">
.example-counter {
	font: inherit;
	cursor: pointer;
	padding: 0.5rem 1rem;
	border-radius: 999px;
	border: 1px solid currentColor;
	background: transparent;
}
</style>
