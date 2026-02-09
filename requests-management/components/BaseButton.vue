<script setup lang="ts">
  type ButtonVariant = 'primary' | 'secondary'
  type ButtonSize = 'small' | 'medium'

  interface Props {
    title: string
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'small',
    disabled: false,
  })

  const emit = defineEmits(['click'])

  const handleClick = (event: Event) => {
    if (!props.disabled) {
      emit('click', event)
    }
  }
</script>

<template>
  <button
      :class="[
      $style.button,
      $style[variant],
      $style[size],
    ]"
      :disabled="disabled"
      @click="handleClick"
  >
    {{ title }}
  </button>
</template>

<style module lang="scss">
  .button {
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 130%;
    cursor: pointer;
    transition: all var(--transition-duration) ease;
    border: none;
    white-space: nowrap;
  }

  .primary {
    background: var(--gradient-button-primary);
    color: var(--color-text-contrast);
    font-weight: 700;
    font-size: 14px;
    line-height: 130%;
    transition: opacity var(--transition-duration) ease-in;

    @include hover{
      &:not([disabled]) {
        background: var(--color-bg-brand);
      }
    }

    &[disabled] {
      background: var(--color-bg-disabled);
      color: var(--color-text-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  .secondary {
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-stroke-border);
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;

    @include hover{
      &:not([disabled]) {
        background: var(--color-bg-primary);
      }
    }
  }

  .small {
    padding-block: 9px;
    width: 114px;
  }

  .medium {
    padding-block: 9px;
    width: 140px;
  }
</style>