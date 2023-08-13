export interface ILocation {
    id: number,
    name: string,
    wind: IWind,
    pressure: number,
    temp: number | string,
    feels_like: string,
    humidity: number,
    clouds: number,
    visibility: number | string,
    weather: IWeather
}

export interface ICoord {
    lat: string,
    lon: string
}

interface IWind {
    deg: number,
    speed: number
}

interface IWeather {
    main: string,
    description: string,
    iconURL: string
}