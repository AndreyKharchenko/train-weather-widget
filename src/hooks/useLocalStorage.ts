import { onMounted, ref } from "vue";

export default function useLocalStorage(key: string, initValue: any) {
    const storedValue = ref('');
    
    const initStoredValue = () => {
        const item = window.localStorage.getItem(key);
        storedValue.value = item ? JSON.parse(item) : initValue;
    }

    const setValue = (value: string) => {
        storedValue.value = value;
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    onMounted(initStoredValue);

    return {
        storedValue,
        setValue
    }
}