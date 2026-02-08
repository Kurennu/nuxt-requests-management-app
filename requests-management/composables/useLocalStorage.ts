export const useLocalStorage = () => {
    const getItem = <T>(key: string): T | null => {
        if (import.meta.client) {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        }
        return null
    }

    const setItem = <T>(key: string, value: T): void => {
        if (import.meta.client) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    const removeItem = (key: string): void => {
        if (import.meta.client) {
            localStorage.removeItem(key)
        }
    }

    const clear = (): void => {
        if (import.meta.client) {
            localStorage.clear()
        }
    }

    return { getItem, setItem, removeItem, clear }
}