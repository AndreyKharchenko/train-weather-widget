<template>
  <div class="weather-widget-container">
    <div class="weather-widget-list" v-if="!isSettings">
      <LocationList 
        :locations="locations"
        @onSettings="onSettings"
      />
    </div>

    <div v-else-if="isSettings">
      <WidgetSettings
        :locations="locations"
        @onCloseSettings="onCloseSettings"
        @onDragStart="(e, location) => onDragStart(e, location)"
        @onDragEnd="onDragEnd"
        @onDragOver="onDragOver"
        @onDrop="onDrop"
        @removeLocation="removeLocation"
        @addLocation="addLocation"
      />
    </div>
    

  </div>
</template>

<script lang="ts">

import { weatherAPI } from "@/api/weatherWidget";
import useLocalStorage from "@/hooks/useLocalStorage";
import useNavigator from "@/hooks/useNavigator";
import { ILocation, ICoord } from "@/models/weatherWidget"
import { defineComponent, onMounted, ref } from "vue"
import LocationList from "./LocationList/LocationList.vue";
import WidgetSettings from "./Settings/WidgetSettings.vue";

export default defineComponent({
  components: { LocationList, WidgetSettings },
  name: 'WeatherWidget',
  setup() {
      const locations = ref<ILocation[]>([]);
      const isSettings = ref<boolean>(false);
      const currentLocId = ref({});

      const {getCurrentPosition} = useNavigator();
      const {setItems, getItems} = useLocalStorage();

      const onDragStart = (e: any, location: ILocation) => {
        currentLocId.value = {...location};
      }

      const onDragEnd = (e: any) => {
        e.preventDefault();
      }

      const onDragOver = (e: any) => {
        e.preventDefault();
      }

      const onDrop = (e: any, location: ILocation) => {
        e.preventDefault();
        const loc1 = JSON.parse(JSON.stringify(currentLocId.value));
        const loc2 = JSON.parse(JSON.stringify(location));

        const loc1Idx = locations.value.findIndex(it => it.id == loc1.id);
        const loc2Idx = locations.value.findIndex(it => it.id == loc2.id);

        locations.value[loc1Idx] = {...loc2};
        locations.value[loc2Idx] = {...loc1};

        setItems("locations", locations.value);
      }

      const onSettings = () => {
        isSettings.value = true;
      }

      const onCloseSettings = () => {
        isSettings.value = false;
      }

      const addLocation = async (location: string) => {
          try {
            const coord : ICoord = await getCoord(location);
            const weather = await getLocationWeather(coord);
            console.log('weather', weather);
            if(Object.keys(weather).length) {
              locations.value = [...locations.value, {...make_locations_data(weather)}];
              setItems('locations', locations.value);
            }
          } catch (error) {
            console.error('ERR: addLocation', error);
          }
      }

      const removeLocation = (id: number) => {
        locations.value = locations.value.filter(it => it.id != id);
        setItems("locations", locations.value);
      }

      const getCoord = async (location: string): Promise<ICoord> => {
        try {
          const res = await weatherAPI.getCoord({q: location, limit:1});
          const {lat, lon} = res.data[0];
          return {lat, lon};
        } catch (error) {
          console.log('ERR: getCoord', error);
          throw(error);
        } 
      }

      const getLocationWeather = async(coord: ICoord) => {
        try {
          if(coord?.lat && coord?.lon) {
            const res = await weatherAPI.getLocationWeather(coord);
            return res.data;
          }
        } catch (error) {
          console.log('ERR: getLocationWeather', error);
        }
      }

      const make_locations_data = (weather: any): ILocation => {
        return {
          id: locations.value.length + 1,
          name: weather.name,
          wind: {deg: weather.wind.deg, speed: weather.wind.speed},
          pressure: weather.main.pressure,
          temp: weather.main.temp.toFixed(0),
          feels_like: weather.main.feels_like,
          humidity: weather.main.humidity,
          clouds: weather.clouds.all,
          visibility: (weather.visibility / 1000).toFixed(1),
          weather: {
            main: weather.weather[0].main, 
            description: weather.weather[0].description, 
            iconURL: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
          },
        }
      }

      const initWidget =  async () => {
        const location_items = await JSON.parse(getItems("locations"));
        if(!location_items) {
          console.log('1');
          const current_coord = await getCurrentPosition();
          const current_weather = await getLocationWeather(current_coord);
          locations.value = [...locations.value, {...make_locations_data(current_weather)}];
          setItems("locations", locations.value);
        } else {
          console.log('2');
          locations.value = [...location_items];
        }
        
      }

      onMounted(initWidget);

      return {
        locations,
        isSettings,
        onDragStart,
        onDragEnd,
        onDragOver,
        onDrop,
        onSettings,
        onCloseSettings,
        addLocation,
        removeLocation,
        getCoord,
        getLocationWeather
      }
  },
})
</script>

<style scoped>
</style>
