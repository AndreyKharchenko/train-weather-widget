import { API_KEY } from "@/utils/utils";
import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/',
});

export const weatherAPI = {
    // Получение данных о погоде
    getLocationWeather(params: any) {
        return instance.get(`data/2.5/weather`, {params: {...params, units: 'metric', appid: API_KEY}});
    },
    // Получение координат
    getCoord(params: any) {
        return instance.get(`geo/1.0/direct`, {params: {...params, appid: API_KEY}});
    }
}

