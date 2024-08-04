<template>
    <input
        :class="inputClass"
        :placeholder="placeholder"
        :type="type"
        :name="name"
        :required="required"
        :value="modelValue"
        :id="id"
        :size="size"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { defineProps } from 'vue';
interface Props {
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    placeholder?: string;
    modelValue?: string;
    type?: string;
    name?: string;
    required?: boolean;
    pattern?: string;
    id?: string;
    size?: number;
    maxlength?: number;
    autocomplete?: string;
}
const props = defineProps<Props>();
const inputClass = computed(() => [
    'p-2',
    'border',
    'border-gray-300',
    'rounded',
    'w-full',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    {
        'text-gray-900': !props.color,
        [`text-${props.color}`]: !!props.color,
        'bg-gray-100': !props.backgroundColor,
        [`bg-${props.backgroundColor}`]: !!props.backgroundColor,
        'text-sm': !props.fontSize,
        [`text-${props.fontSize}`]: !!props.fontSize,
    }
]);
</script>

<style scoped>
input {
    height: 40px; /* fixed height */
    font-weight: 500;
}
</style>
