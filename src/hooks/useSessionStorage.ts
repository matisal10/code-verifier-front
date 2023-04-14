export const useSessionStorage = (key: string): any | boolean => {
    const storeValue = sessionStorage.getItem(key)

    if (!storeValue) {
        return false
    }
    else {
        return storeValue
    }
}