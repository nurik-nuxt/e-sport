<template>
    <button :class="buttonClasses" :style="buttonStyle">
        {{ label }}
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface Props {
    label?: string;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    fontSize?: string;
}
const props = defineProps<Props>();

const defaultProps = {
    label: 'Default Button',
    color: '#031954',
    backgroundColor: '#fff',
    borderColor: '#031954',
    fontSize: '14px',
};

const buttonClasses = computed(() => [
    'px-4 py-2 text-center font-semibold rounded transition-all duration-200 cursor-pointer',
    'hover:bg-blue-800 hover:text-white',
    'active:bg-blue-800 active:text-white',
].join(' '));

const buttonStyle = computed(() => ({
    color: props.color || defaultProps.color,
    backgroundColor: props.backgroundColor || defaultProps.backgroundColor,
    border: `1px solid ${props.borderColor || defaultProps.borderColor}`,
    fontSize: props.fontSize || defaultProps.fontSize,
}));
</script>
