<template>
    <v-card
        class="mx-auto"
        max-width="300"
        height="auto"
        id='location-item'
    >
        <v-card-item>
            <div class="location">{{location.name + ", " + location.country_code}}</div>
            <div 
                v-if="isFirst"
                @click="$emit('onSettings')"
            >
                <v-icon
                    icon="mdi-cog-outline"
                    size="22"
                    color="#808080"
                    class="gear me-1 pb-1"
                ></v-icon>
            </div>
        </v-card-item>

        <v-card-text class="py-0">
            <div>
                <v-img
                    width="100"
                    height="100"
                    :src="location.weather.iconURL"
                >
                </v-img>
            </div>
            <div class="temp">{{location.temp}}&deg;C</div>
        </v-card-text>

        <v-card-subtitle>{{location.weather.main + ". " + location.weather.description + ". " + "Feels like " + location.feels_like}}</v-card-subtitle>

        <div class="weather-info">
            <v-list-item density="compact" prepend-icon="mdi-weather-windy">
                <v-list-item-subtitle>{{location.wind.speed}} m/s</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-thermometer">
                <v-list-item-subtitle>{{location.pressure}}hPa</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact">
                <v-list-item-subtitle>Humidity {{location.humidity}}%</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact">
                <v-list-item-subtitle>Cloudiness {{location.clouds}}%</v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact">
                <v-list-item-subtitle>Visibility {{location.visibility}} km</v-list-item-subtitle>
            </v-list-item>
        </div>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import {ILocation} from '../../../models/weatherWidget'
export default defineComponent({
  name: 'LocationItem',
  props: {
    location: {
        required: true,
        type: Object as PropType<ILocation>
    },
    isFirst: {
        required: true,
        type: Boolean
    }
  },
})
</script>

<style>
#location-item {
    box-sizing: border-box;
    margin-bottom: 10px;
}
#location-item .v-card-item__content {
    display: flex !important;;
    justify-content: space-between!important;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
}

#location-item .v-card-text {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 0.7rem;
    margin-left: -0.7rem;
    width: 100%;
}

#location-item .temp {
    font-size: 35px;
    font-weight: 700;
    margin-left: -3rem;
}

#location-item .v-card-subtitle {
    text-wrap: wrap;
    margin-top: 1rem;
}

#location-item .weather-info {
    display: flex;
    flex-flow: row wrap;
    margin-top: 1rem;
}

#location-item .gear {
    cursor: pointer;
}

</style>



