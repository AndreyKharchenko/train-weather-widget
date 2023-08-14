import { onMounted } from "vue";

export default function useLocalStorage() {
    const setItems = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const getItems = (key: string) => {
        //return JSON.parse(localStorage.getItem(key) || "");
        const data = localStorage.getItem(key);
        return JSON.parse(JSON.stringify(data) || '');
    }

    return {
        setItems,
        getItems
    }
}