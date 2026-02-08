<script setup lang="ts">
  import RequestTable from '~/components/RequestsTable.vue'

  definePageMeta({
    layout: 'default'
  })
</script>

<template>
  <PageWrapper title="Заявки">
    <RequestTable />
  </PageWrapper>
</template>
