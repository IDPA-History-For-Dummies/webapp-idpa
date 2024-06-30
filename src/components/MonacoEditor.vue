<template>
	<div ref="editorContainer" class="editor-container"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as monaco from 'monaco-editor';

export default defineComponent({
	name: 'MonacoEditor',
	props: {
		modelValue: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			default: 'javascript',
		},
		theme: {
			type: String,
			default: 'vs-dark',
		},
		height: {
			type: String,
			default: '300px',
		},
		readonly: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const editorContainer = ref<HTMLElement | null>(null);
		let editor: monaco.editor.IStandaloneCodeEditor | null = null;

		onMounted(() => {
			if (editorContainer.value) {
				editor = monaco.editor.create(editorContainer.value, {
					value: props.modelValue,
					language: props.language,
					theme: props.theme,
					readOnly: props.readonly,
					automaticLayout: true,
				});

				editor.onDidChangeModelContent(() => {
					emit('update:modelValue', editor?.getValue());
				});
			}
		});

		onBeforeUnmount(() => {
			editor?.dispose();
		});

		watch(() => props.readonly, (newValue) => {
			if (editor) {
				editor.updateOptions({ readOnly: newValue });
			}
		});

		return {
			editorContainer,
		};
	},
});
</script>

<style scoped>
.editor-container {
	width: 100%;
	height: var(--editor-height, 300px);
	border: 1px solid #ccc;
	border-radius: 4px;
}
</style>
