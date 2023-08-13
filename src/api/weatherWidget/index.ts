import axios from "axios";

const API_KEY = '84882f276cf7ddc264d2de3e25f7cf03';
//const API_KEY = '7a027cf18a44aa38ea7a7ced214e31bd';

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

