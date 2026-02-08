<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
      <h1 :class="$style.title">{{ title }}</h1>
    </div>
    <div :class="$style.content">
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
  .wrapper {
    background: var(--color-bg-secondary);
    border-radius: 16px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    height: 100%;

    .header {
      display: flex;
      justify-content: flex-start;
      gap: 12px;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid var(--color-stroke-border-light);

      .title {
        font-weight: 700;
        font-size: 24px;
        line-height: 130%;
        color: var(--color-text-primary);
      }
    }
  }

  .actions {
    display: flex;
    gap: 12px;
  }

  .content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

</style>