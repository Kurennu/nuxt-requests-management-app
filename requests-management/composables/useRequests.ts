import type { Request, RequestSubmitData, RequestLocalData } from '~/types'

export const useRequests = () => {
    const { getItem, removeItem } = useLocalStorage()

    const requests = ref<Request[]>([])
    const loading = ref(false)

    const loadRequests = async () => {
        loading.value = true
        try {
            requests.value = await $fetch<Request[]>('/api/table-data')
            requests.value = requests.value.map(request => ({
                ...request,
                status: hasLocalData(request.id) ? 'Готова к отправке' : 'Активна'
            }))
        } catch (e) {
            console.error(e)
        } finally {
            loading.value = false
        }
    }

    const hasLocalData = (requestId: number): boolean => {
        return getItem(`request_${requestId}`) !== null
    }

    const submitRequest = async (requestId: number) => {
        const localData = getItem<RequestLocalData>(`request_${requestId}`)

        if (!localData) {
            throw new Error('Нет данных для отправки')
        }

        const submitData: RequestSubmitData = {
            id: requestId,
            products: localData.products
        }

        try {
            const response = await $fetch('/api/send', {
                method: 'POST',
                body: submitData
            })

            if (response.success) {
                removeItem(`request_${requestId}`)
                await loadRequests()
            }

            return response
        } catch (e) {
            throw e
        }
    }

    return {
        requests,
        loading,
        loadRequests,
        hasLocalData,
        submitRequest
    }
}