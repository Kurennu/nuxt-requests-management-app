<script setup lang="ts">
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
    isEmpty: (value: string | number | undefined): boolean => {
      return value === undefined || value === null || value === ''
    },

    isValidNumber: (value: string | number | undefined): boolean => {
      if (validators.isEmpty(value)) return false
      return /^\d+(\.\d+)?$/.test(String(value))
    },

    isInList: (value: string | undefined, list: string[]): boolean => {
      return !!value && list.includes(value)
    }
  }

  const validateField = (
      value: string | number | undefined,
      fieldName: 'quantity' | 'price' | 'color'
  ): string | undefined => {
    switch (fieldName) {
      case 'quantity':
      case 'price':

        if (validators.isEmpty(value)) {
          return 'Поле не может быть пустым'
        }

        if (!validators.isValidNumber(value)) {
          return 'Только цифры и точка'
        }

        const numValue = Number(value)
        if (numValue <= 0) {
          return fieldName === 'price'
              ? 'Цена должна быть больше 0'
              : 'Количество должно быть больше 0'
        }
        break

      case 'color':
        if (!validators.isInList(value as string, allowedColors)) {
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
        aria-label="Сохранить таблицу продуктов"
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