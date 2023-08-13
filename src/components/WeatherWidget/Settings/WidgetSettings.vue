<template>
  <div class="widget-settings-container">
    <v-card
      class="mx-auto"
      max-width="300"
    >
      <v-card-title class="title">
        <div>Settings: </div>
        <div class="close-btn" @click="$emit('onCloseSettings')"><v-icon size="22" color="gray">mdi-close</v-icon></div>
      </v-card-title>

      <div class="location-list">
        <v-list-item 
          v-for="(location) in locations" 
          :key="location.id"
        >
          <v-list-item-title>
            <div class="item-name">
              <div
                class="menu-icon"
                draggable="true"
                @dragstart="(e) => $emit('onDragStart', e, location)"
                @dragleave="(e) => $emit('onDragEnd', e)"
                @dragend="(e) => $emit('onDragEnd', e)"
                @dragover="(e) => $emit('onDragOver', e)"
                @drop="(e) => $emit('onDrop', e, location)"
              >
                <v-icon>mdi-menu</v-icon>
              </div>
              <div>{{location.name}}</div>
            </div>

            <div class="remove-item-btn" @click="$emit('removeLocation', location.id)"><v-icon>mdi-trash-can-outline</v-icon></div>
          </v-list-item-title>
        </v-list-item>
      </div>

      <div class="add-location">
        <div class="add-location-title">
          <div>Add Location:</div>
        </div>

        <div class="input-container">
          <div class="input">
            <v-text-field
              density="compact"
              placeholder="Location"
              variant="outlined"
              v-model="location"
              clearable
              color="primary"
            ></v-text-field>
          </div>
          <v-btn variant="outlined" density="compact" @click="addLocation" color='primary'>Add</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue"
import {ILocation} from '../../../models/weatherWidget'
export default defineComponent({
  name: 'WidgetSettings',
  props: {
    locations: {
      required: true,
      type: Array as PropType<ILocation[]>
    }
  },
  setup(_, {emit}) {
      const location = ref<string>('');
      const addLocation = () => {
        emit('addLocation', location.value);
        location.value = "";
      }


      return {
        location,
        addLocation
      }
  }
})
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
}

.location-list {
  padding: 10px
}

.location-list .v-list-item {
  background-color: darkgrey;
  margin-bottom: 10px;
}

.location-list .v-list-item-title {
  display: flex;
  justify-content: space-between;
}

.item-name {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.item-name div:first-child {
  margin-right: 5px;
}

.add-location .add-location-title {
  display: flex;
  justify-content: flex-start;
  margin-left: 15px;
  font-weight: 700;
}

.add-location .input-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 10px;
}

.add-location .input-container .input {
  width: 60%;
}

.menu-icon {
  cursor: grab;
}

.remove-item-btn, .close-btn {
  cursor: pointer;
}
</style>