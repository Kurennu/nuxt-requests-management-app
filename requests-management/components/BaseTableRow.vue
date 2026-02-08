<script setup lang="ts">
  interface Props {
    clickable?: boolean
  }

  withDefaults(defineProps<Props>(), {
    clickable: false
  })

  const emit = defineEmits(['click'])
</script>

<template>
  <div
      :class="[
      $style.row,
      clickable && $style.clickable
    ]"
      @click="clickable && emit('click')"
  >
    <slot />
  </div>
</template>

<style module lang="scss">
  .row {
    display: grid;
    grid-template-columns: var(--table-columns);

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-stroke-border-light);
    }
  }

  .clickable {
    cursor: pointer;
    transition: background-color var(--transition-duration) ease;

    &:hover {
      background-color: var(--color-bg-date-range);
    }
  }
</style>