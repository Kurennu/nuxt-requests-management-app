<script setup lang="ts">
  interface Props {
    modelValue: string | number
    type?: 'text' | 'number'
    readonly?: boolean
    error?: string
    placeholder?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    readonly: false,
    modelValue: '',
    placeholder: '0',
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string | number]
  }>()

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }

  const clearInput = () => {
    emit('update:modelValue', '')
  }

  const showClearButton = computed(() => {
    return !props.readonly && props.modelValue !== '' && props.modelValue !== undefined && props.modelValue !== null
  })
</script>

<template>
  <div :class="$style.wrapper">
    <input
        :value="modelValue"
        :type="type"
        :readonly="readonly"
        :placeholder="placeholder"
        :class="[
        $style.input,
          { [$style.readonly]: readonly },
          { [$style.error]: error },
      ]"
        @input="handleInput"
    />

    <button
        v-if="showClearButton"
        type="button"
        :class="$style.clearButton"
        @click="clearInput"
        aria-label="Очистить"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.164715 0.16479C0.384364 -0.0549007 0.74052 -0.0549342 0.96021 0.164715L4.56225 3.76608L8.16429 0.164715C8.38398 -0.0549342 8.74014 -0.0549007 8.95979 0.16479C9.17943 0.38448 9.1794 0.740635 8.95971 0.960285L5.35782 4.5615L8.95971 8.16271C9.1794 8.38236 9.17943 8.73852 8.95979 8.95821C8.74014 9.1779 8.38398 9.17793 8.16429 8.95828L4.56225 5.35692L0.96021 8.95828C0.74052 9.17793 0.384364 9.1779 0.164715 8.95821C-0.0549342 8.73852 -0.0549008 8.38236 0.16479 8.16271L3.76668 4.5615L0.16479 0.960285C-0.0549008 0.740635 -0.0549342 0.38448 0.164715 0.16479Z" fill="#A7A5A5"/>
      </svg>
    </button>

    <span v-if="error" :class="$style.errorText">
      {{ error }}
    </span>
  </div>
</template>

<style module lang="scss">
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
  }

  .input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--color-stroke-border);
    border-radius: 8px;
    font-size: 14px;
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
    line-height: 143%;

    &:hover{
      border-color: var(--color-stroke-border-hover);
    }

    &:focus {
      outline: none;
      border-color: var(--color-stroke-border-dark);
    }

    &.readonly {
      background-color: var(--color-bg-tertiary);
      cursor: not-allowed;
      color: var(--color-text-secondary);
      border: none;
      font-weight: 400;
      font-size: 14px;
      line-height: 143%;
      padding: 0;
    }

    &.error {
      border-color: var(--color-stroke-border-error);
    }
  }

  .clearButton {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-icon-primary);
    transition: color 0.2s ease;

    &:focus {
      outline: none;
    }

    svg {
      @include square(9px);
    }
  }

  .errorText {
    position: absolute;
    bottom: calc(-100%);
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