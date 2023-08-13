<template>
  <LocationItem 
    v-for="(location,index) in locations"
    :key="location.id"
    :location="location"
    :isFirst="index == 0"
    @onSettings="onSettings"
  />
</template>

<script lang="ts">
import { ILocation } from "@/models/weatherWidget";
import { defineComponent, PropType } from "vue";
import LocationItem from "./LocationItem.vue";

export default defineComponent({
  components: { LocationItem },
  name: 'LocationList',
  props: {
    locations: {
        required: true,
        type: Array as PropType<ILocation[]>
    }
  },
  setup(_, {emit}){
    const onSettings = () => {
      emit('onSettings');
    }

    return {
      onSettings
    }
  }
})
</script>

<style scoped>
</style>