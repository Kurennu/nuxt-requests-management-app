<script setup lang="ts">
  import BaseTable from '~/components/BaseTable.vue'
  import BaseTableRow from '~/components/BaseTableRow.vue'
  import BaseTableCell from '~/components/BaseTableCell.vue'
  import BaseInput from '~/components/BaseInput.vue'
  import BaseSelect from '~/components/BaseSelect.vue'
  import BaseButton from '~/components/BaseButton.vue'
  import type { Product } from '~/types'

  const props = defineProps<{
    products: Product[]
  }>()

  const emit = defineEmits<{
    save: [products: Product[]]
  }>()

  const editableProducts = ref<Product[]>([])
  const errors = ref<Record<number, { quantity?: string; price?: string; color?: string }>>({})

  const colorOptions = [
    { value: 'black', label: 'Чёрный' },
    { value: 'white', label: 'Белый' },
    { value: 'grey', label: 'Серый' }
  ]

  const allowedColors = colorOptions.map(option => option.value)

  watch(() => props.products, (newProducts) => {
    if (newProducts.length > 0) {
      editableProducts.value = JSON.parse(JSON.stringify(newProducts))
    }
  }, { immediate: true })

  const validators = {
    isEmpty: (value: any): boolean => {
      return value === undefined || value === null || value === ''
    },

    isValidNumber: (value: any): boolean => {
      if (validators.isEmpty(value)) return false
      return /^\d+(\.\d+)?$/.test(String(value))
    },

    isInList: (value: any, list: string[]): boolean => {
      return list.includes(value)
    }
  }

  const validateField = (
      value: any,
      fieldName: 'quantity' | 'price' | 'color'
  ): string | undefined => {
    switch (fieldName) {
      case 'quantity':
      case 'price':
        if (validators.isEmpty(value) && value !== 0) {
          return 'Поле не может быть пустым'
        }
        if (!validators.isValidNumber(value)) {
          return 'Только цифры и точка'
        }
        break

      case 'color':
        if (validators.isEmpty(value)) {
          return 'Выберите цвет'
        }
        if (!validators.isInList(value, allowedColors)) {
          return 'Выберите цвет из списка'
        }
        break
    }

    return undefined
  }

  const validateForm = (): boolean => {
    errors.value = {}
    let isValid = true

    editableProducts.value.forEach(product => {
      const productErrors: Record<string, string> = {}

      const fields: Array<keyof Pick<Product, 'quantity' | 'price' | 'color'>> = [
        'quantity',
        'price',
        'color'
      ]

      fields.forEach(field => {
        const error = validateField(product[field], field)
        if (error) {
          productErrors[field] = error
          isValid = false
        }
      })

      if (Object.keys(productErrors).length > 0) {
        errors.value[product.id] = productErrors
      }
    })

    return isValid
  }

  const handleSave = () => {
    if (validateForm()) {
      emit('save', editableProducts.value)
    }
  }
</script>

<template>
  <div :class="$style.wrapper">
    <BaseButton
        title="Сохранить"
        variant="primary"
        size="medium"
        @click="handleSave"
        :class="$style.saveButton"
    />

    <BaseTable
        :columns="['Название', 'Количество', 'Цена', 'Цвет']"
        grid-columns="repeat(4, 1fr)"
    >
      <BaseTableRow
          v-for="product in editableProducts"
          :key="product.id"
      >
        <BaseTableCell>
          <BaseInput
              :model-value="product.name"
              readonly
          />
        </BaseTableCell>

        <BaseTableCell>
          <BaseInput
              v-model="product.quantity"
              :error="errors[product.id]?.quantity"
          />
        </BaseTableCell>

        <BaseTableCell>
          <BaseInput
              v-model="product.price"
              :error="errors[product.id]?.price"
          />
        </BaseTableCell>

        <BaseTableCell>
          <BaseSelect
              v-model="product.color"
              :options="colorOptions"
              placeholder="Выберите"
              :error="errors[product.id]?.color"
          />
        </BaseTableCell>
      </BaseTableRow>
    </BaseTable>
  </div>
</template>

<style module lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .saveButton {
    align-self: flex-end;
  }
</style>