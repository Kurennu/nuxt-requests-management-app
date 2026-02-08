<script setup lang="ts">
  defineProps<{
    columns: string[]
    gridColumns?: string
  }>()
</script>

<template>
  <div :class="$style.table" :style="{ '--table-columns': gridColumns }">
    <div :class="[$style.row, $style.header]">
      <div
          v-for="(column, index) in columns"
          :key="index"
          :class="$style.cell"
      >
        {{ column }}
      </div>
    </div>
    <slot />
  </div>
</template>

<style module lang="scss">
  .table {
    --table-columns: 1fr;
    border-radius: 12px;
    border: 1px solid var(--color-stroke-border-light);
  }

  .row {
    display: grid;
    grid-template-columns: var(--table-columns);
  }

  .header {
    background-color: var(--color-bg-primary);
    overflow: hidden;
    border-radius: 12px 12px 0 0;

    .cell {
      padding: 15px 20px;
      font-weight: 700;
      font-size: 14px;
      line-height: 130%;
      color: var(--color-text-tertiary);
      border-bottom: 1px solid var(--color-stroke-border-light);
    }
  }
</style>