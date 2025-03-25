<template>
  <div class="relative flex max-md:flex-col md:items-center h-full !w-full">
    <div
      @click="toggleSearch"
      class="md:hidden left-2.5 top-2.5 absolute z-10 bg-dark rounded-lg p-2 size-10 flex items-center justify-center cursor-pointer transition-300"
    >
      <span
        :class="openSearch ? 'icon-close-circle' : 'icon-search-regular'"
        class="text-2xl text-gray-250"
      />
    </div>
    <!-- Sidebar with list of locations -->
    <div
      :class="{ 'max-md:hidden': !openSearch }"
      class="location-list max-w-xs w-full bg-gray-450 h-full overflow-y-auto absolute md:left-32 min-[400px]:left-14 left-auto max-[400px]:right-0 z-10 smth"
    >
      <div class="p-4 bg-gray-400 sticky top-0 z-10">
        <FormInputSearch
          v-model="searchQuery"
          placeholder="Поиск"
          class="bg-white"
          @clear="searchQuery = ''"
        />
      </div>
      <div class="px-4 flex flex-col gap-y-3 mt-4 h-full">
        <div
          v-for="location in filteredLocations"
          :key="location.id"
          @click="focusLocation(location)"
          :class="{ 'bg-white': activeLocation?.id === location.id }"
          class="p-4 cursor-pointer bg-gray-250 group hover:bg-white hover:shadow transition-300 !h-full"
        >
          <p class="md:text-lg text-sm font-bold">{{ location.address }}</p>
          <div class="flex items-center mt-5">
            <i
              class="icon-phone text-gray-300 group-hover:text-red transition-300"
            />
            <a
              :href="'tel:' + location.phone"
              class="font-semibold text-dark text-sm"
              >{{ location.phone }}</a
            >
          </div>
        </div>
      </div>
      <div
        class="fixed bg-gradient-to-t from-gray-350 to-transparent w-full h-16 bottom-0"
      />
    </div>

    <!-- Map -->
    <client-only>
      <yandex-map
        :coords="centerCoords"
        :controls="[]"
        :settings="settings"
        :zoom="18"
        zoom-control="false"
        class="max-h-[580px] !h-full md:aspect-video !w-full"
      >
        <ymap-marker
          v-for="(location, index) in locations"
          :key="location.id"
          :coords="[location.lat, location.long]"
          :marker-id="location.id"
          :icon="markerIcon"
        >
          <div class="marker" />
        </ymap-marker>
      </yandex-map>
    </client-only>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

interface Location {
  id: string
  name: string
  lat: number
  long: number
  address: string
  phone: string
}

interface Props {
  locations: Location[]
}

const props = defineProps<Props>()
const searchQuery = ref('')
const activeLocation = ref<Location | null>(null)

// Marker icon configuration
const markerIcon = {
  layout: 'default#image',
  imageHref: '/images/location-mark.svg',
  imageSize: [32, 32],
  imageOffset: [-16, -32],
}

const centerCoords = ref(
  [props.locations[0]?.lat, props.locations[0]?.long] || [0, 0]
)

const settings = {
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
  suppressMapOpenBlock: true,
}

// Computed to filter locations by search query
const filteredLocations = computed(() =>
  props.locations.filter((location) =>
    location.address?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)
const openSearch = ref(false)
// Function to focus on clicked location
const focusLocation = (location: Location) => {
  centerCoords.value = [location.lat, location.long]
  activeLocation.value = location
  openSearch.value = false
}

function toggleSearch() {
  openSearch.value = !openSearch.value
}

// Watch for changes in props.locations to update map center
watch(
  () => props.locations,
  (newLocations) => {
    if (newLocations.length) {
      centerCoords.value = [newLocations[0].lat, newLocations[0].long]
    }
  }
)
</script>
<style>
.marker {
  position: relative;
  width: 20px;
  height: 20px;
  background: #ff0000;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 20px;
}

/* Transitions */
.list-active-enter-active,
.list-active-leave-active,
.map-active-enter-active,
.map-active-leave-active {
  transition: all 0.3s ease-out;
}

.list-active-enter-from {
  transform: translateX(50%);
  opacity: 0;
}

.list-active-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}

.map-active-enter-from {
  transform: translateX(-50%);
  opacity: 0;
}

.map-active-leave-to {
  transform: translateX(50%);
  opacity: 0;
}

/* Hide Yandex copyright */
.ymaps-2-1-79-map-copyrights-promo,
.ymaps-2-1-79-copyright__agreement {
  display: none;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.smth::-webkit-scrollbar {
  width: 2px;
}

.smth::-webkit-scrollbar-track {
  background: #eaebed;
}

.smth::-webkit-scrollbar-thumb {
  background: #cdcdd0;
}
</style>
