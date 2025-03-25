<template>
  <div class="h-[485px] relative">
    <ClientOnly>
      <yandex-map
        class="h-full w-full"
        :coords="coords"
        :settings="mapSettings"
        :zoom="14"
        :controls="[]"
        disabled
        @click="onClick"
      >
        <ymap-marker
          :coords="coords"
          marker-id="123"
          :hint-content="$t('location')"
          :icon="markerIcon"
        />
        <ymap-marker
          v-for="(item, index) in btsStore.bts"
          :coords="[item?.latitude, item?.longitude]"
          :marker-id="index.toString()"
          :hint-content="item?.name"
          :icon="btsIcon"
          @click="onMarkerClick(item)"
        />
      </yandex-map>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useBtsStore } from '~/store/bts'

const btsStore = useBtsStore()

interface Props {
  modelValue: number[]
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
const btsIcon = {
  layout: 'default#imageWithContent',
  imageHref: '/images/bts.svg',
  imageSize: [30, 40],
  imageOffset: [-20, -30],
}

const coords = ref([41.31, 69.26])
watch(
  () => coords.value,
  () => {
    emit('update:modelValue', coords.value)
  },
  {
    deep: true,
  }
)
const mapSettings = ref({
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
})
function onClick(e: any) {
  try {
    if (process.client) {
      let cords = e?.get('coords')
      coords.value = [cords[0], cords[1]]
      emit('update:modelValue', coords.value)
    }
  } catch (err) {}
}
function onMarkerClick(address: string | undefined) {
  try {
    if (process.client && address) {
      coords.value = [address.latitude, address.longitude]
      emit('update:modelValue', coords.value)
    }
  } catch (err) {}
}
const changing = ref(false)
watch(
  () => props.modelValue,
  () => {
    if (!changing.value) {
      coords.value = [props.modelValue[0], props.modelValue[1]]
      changing.value = true
      setTimeout(() => {
        changing.value = false
      }, 300)
    }
  }
)

// watch(props, () => {
//   if (props.modelValue !== coords.value) {
//     coords.value = props.modelValue
//     changing.value = true
//     setTimeout(() => {
//       changing.value = false
//     }, 300)
//   }
// },{deep:true})
</script>