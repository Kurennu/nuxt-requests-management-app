<script setup lang="ts">
  import BaseTable from '~/components/BaseTable.vue'
  import BaseTableRow from '~/components/BaseTableRow.vue'
  import BaseTableCell from '~/components/BaseTableCell.vue'
  import BaseButton from '~/components/BaseButton.vue'

  const router = useRouter()
  const { requests, loading, loadRequests, hasLocalData, submitRequest } = useRequests()

  onMounted(() => {
      loadRequests()
    })

    const formatDate = (dateString?: string) => {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleDateString('ru-RU')
    }

    const handleSubmit = async (requestId: number) => {
      try {
        await submitRequest(requestId)
        alert('Заявка успешно отправлена!')
      } catch (e) {
        alert('Ошибка при отправке')
      }
    }

    const handleRowClick = (requestId: number) => {
      router.push(`/edit?id=${requestId}`)
    }
</script>

<template>
  <p v-if="loading">Загрузка...</p>

  <BaseTable
      v-else
      :columns="['Номер', 'Статус', 'Результат', 'Дата', 'Действие']"
      grid-columns="repeat(4, minmax(0, 345px)) 160px"
  >
    <BaseTableRow
        v-for="request in requests"
        :key="request.id"
        clickable
        @click="handleRowClick(request.id)"
    >
      <BaseTableCell>{{ request.number }}</BaseTableCell>

      <BaseTableCell>
        <span :class="$style.status">
          {{ request.status }}
        </span>
      </BaseTableCell>

      <BaseTableCell>{{ request.checkResult }}</BaseTableCell>

      <BaseTableCell>{{ formatDate(request.createdAt) }}</BaseTableCell>

      <BaseTableCell @click.stop>

          <BaseButton
              v-if="hasLocalData(request.id)"
              title="Отправить"
              variant="primary"
              size="small"
              @click="handleSubmit(request.id)"
          />

          <BaseButton
              v-else
              title="Редактировать"
              variant="secondary"
              size="small"
              @click="handleRowClick(request.id)"
          />

      </BaseTableCell>
    </BaseTableRow>
  </BaseTable>
</template>

<style module lang="scss">
  .status {
    font-weight: 700;
    font-size: 12px;
    line-height: 130%;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: var(--color-bg-success-light);
    color: var(--color-text-success);
  }
</style>