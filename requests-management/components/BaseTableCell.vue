<script setup lang="ts">
</script>

<template>
  <div :class="[$style.cell]">
    <slot />
  </div>
</template>

<style module lang="scss">
  .cell {
    padding: 20px 12px 20px 20px;
    font-size: 16px;
    line-height: 150%;
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    font-weight: 400;
    justify-content: flex-start;
  }
</style>