<template>
  <div class="h-[485px]">
    <yandex-map
        class="h-full w-full"
        :coords="coords"
        :settings="mapSettings"
        :zoom="14"
        :controls="[]"
    >
      <ymap-marker
          :coords="coords"
      />
    </yandex-map>
  </div>
</template>

<script setup lang="ts">
interface Props {
  coords: Number[]
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'update:modelValue', value: object): void
}>()

const markerIcon = {
  layout: 'default#imageWithContent',
  imageHref: '/images/location-mark.svg',
  imageSize: [20, 30],
  imageOffset: [-20, -30],
}

const mapSettings = ref({
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
})
</script>
