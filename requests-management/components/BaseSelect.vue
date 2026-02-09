<script setup lang="ts">
  interface Option {
    value: string
    label: string
  }

  interface Props {
    modelValue: string
    options: Option[]
    error?: string
    placeholder?: string
  }

  defineProps<Props>()

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement
    emit('update:modelValue', target.value)
  }
</script>

<template>
  <div :class="$style.wrapper">
    <select
        :value="modelValue"
        :class="[
        $style.select,
        error && $style.error
      ]"
        @change="handleChange"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" :class="$style.errorText">
      {{ error }}
    </span>
  </div>
</template>

<style module lang="scss">
  .wrapper {
    width: 100%;
    position: relative;
  }

  .select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--color-stroke-border);
    border-radius: 8px;
    font-size: 14px;
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
    line-height: 143%;

    @include hover{
      border-color: var(--color-stroke-border-hover);
    }

    &:focus {
      outline: none;
      border-color: var(--color-stroke-border-dark);
    }

    &.error {
      border-color: var(--color-stroke-border-error);
    }

    option {
      background-color: var(--color-bg-secondary);
      color: var(--color-text-primary);

      &:checked{
        color: var(--color-text-brand);
        background-color: var(--color-bg-secondary);
      }
    }
  }

  .errorText {
    position: absolute;
    bottom: calc(-100%);
    left: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: var(--color-text-error);
    background-color: var(--color-bg-error-light);
    padding: 8px 12px;
    border-radius: 8px;
    width: 100%;
    z-index: 10;
  }
</style>