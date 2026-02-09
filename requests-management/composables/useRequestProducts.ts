import type { Product, RequestLocalData } from '~/types'

export const useRequestProducts = (requestId: number) => {
    const { getItem, setItem } = useLocalStorage()
    const storageKey = `request_${requestId}`

    const products = ref<Product[]>([])
    const loading = ref(false)

    const loadProducts = async () => {
        const cached = getItem<RequestLocalData>(storageKey)
        if (cached?.products) {
            products.value = cached.products
            return
        }

        loading.value = true
        try {
            products.value = await $fetch<Product[]>('/api/products', {
                query: { id: requestId }
            })
        } catch (e) {
            console.error(e)
        } finally {
            loading.value = false
        }
    }

    const saveProducts = () => {
        const data: RequestLocalData = {
            id: requestId,
            products: products.value,
            updatedAt: new Date().toISOString()
        }
        setItem(storageKey, data)
    }

    const hasUnsavedChanges = computed(() => {
        return getItem<RequestLocalData>(storageKey) !== null
    })

    return {
        products,
        loading,
        loadProducts,
        saveProducts,
        hasUnsavedChanges
    }
}