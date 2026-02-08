<script setup lang="ts">
</script>

<template>
  <div :class="$style.layout">
    <main :class="$style.main">
      <slot />
    </main>
  </div>
</template>

<style module lang="scss">
  .main {
    width: 100%;
  }

  .layout {
    max-width: calc(var(--container-width) + var(--container-padding-x) * 2);
    margin-inline: auto;
    padding-inline: var(--container-padding-x);
    height: 100%;

    display: flex;
    gap: 12px;
    padding-block: 24px;
  }

</style>