<template>
  <div class="map-container">
    <AboutMap :locations="locationList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Example locations array
const locationList = ref([])

const api = useApi()

function getBranches() {
  api.actionGet('GET', 'settings/branches').then((response) => {
    locationList.value = response.results.map((branch: any) => {
      return {
        id: branch.id,
        lat: branch.location.latitude,
        long: branch.location.longitude,
        address: branch.name,
        phone: branch.phone_number,
      }
    })
  })
}

onMounted(() => {
  getBranches()
})
</script>

<style scoped>
.map-container {
  height: 580px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
