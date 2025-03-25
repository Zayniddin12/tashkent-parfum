<template>
  <div>
    <div class="mb-4 flex flex-col">
      <div
        class="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0"
      >
        <FormGroup :label="$t('region')" class="md:w-1/2">
          <FormSelect
            :list="regionStore.region"
            :modelValue="form.values.location.region?.title"
            @update:modelValue="(val) => (form.values.location.region = val)"
            :error="form.$v.value.location.region.$error"
            :placeholder="$t('choose_region')"
            :disabled="regionStore.loading"
            class="w-full"
            @fetchData="regionFetch"
            :loading="regionStore.loading"
          />
        </FormGroup>
        <FormGroup :label="$t('district_city')" class="md:w-1/2">
          <FormSelect
            :list="regionStore.district"
            :modelValue="form.values.location.district?.title"
            @update:modelValue="(val) => (form.values.location.district = val)"
            :error="form.$v.value.location.district?.$error"
            :disabled="regionStore.distLoading && !form.values.location.region?.title?.length"
            :placeholder="$t('choose_district')"
            class="w-full"
            @fetchData="districtFetch"
            :loading="regionStore.distLoading"
          />
        </FormGroup>
      </div>
      <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div class="w-full">
          <FormLabel
            for-text="name"
            :label="$t('address')"
            class="text-gray-100 font-semibold text-sm leading-130"
          />
          <ClientOnly>
            <FormInputSelect
              v-model="form.values.location.address"
              label-key="title"
              value-key="title"
              selected-option-styles="!p-0"
              :options="options"
              @get-coords="getCoords"
              class="mt-2 w-full"
            >
              <template #selectedOption>
                <FormInput
                  v-model="form.values.location.address"
                  :class="
                  form.$v.value.location.address?.$error
                    ? '!border-red placeholder:!text-red'
                    : ''
                "
                  :placeholder="$t('enter_address_delivery')"
                />
              </template>
            </FormInputSelect>
          </ClientOnly>
        </div>
      </div>
      <div class="py-2.5 px-4 w-fit rounded-xl warner inline-flex items-center mt-4">
        <i class="mr-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.0007" cy="10" r="6.66667" stroke="#26D176" stroke-width="1.6"/>
            <path d="M10 13.3334V9.33337" stroke="#26D176" stroke-width="1.6" stroke-linecap="round"/>
            <ellipse cx="0.666667" cy="0.666667" rx="0.666667" ry="0.666667" transform="matrix(1 0 0 -1 9.33398 8)" fill="#26D176"/>
          </svg>

        </i>
        <p class="text-dark font-semibold text-sm"> {{ $t('address_warning') }} </p>
      </div>
    </div>
    <CommonMap class="h-[330px]" v-model="map" @update:modelValue="updateValue" />
    <div
      class="flex flex-col-reverse md:flex-row md:items-center md:justify-between border-t border-gray-600 pt-4 mt-4"
    >
      <CommonButton
        variant="secondary-light"
        class="md:w-1/4"
        @click="backFunc"
      >
        <span class="icon-arrow-left text-[24px] leading-[24px]" />
        {{ $t('to_cart') }}
      </CommonButton>
      <CommonButton
        :disabled="nextActive || nextButtonActive"
        class="md:w-1/4 mb-2 md:mb-0"
        @click="nextFunc"
      >
        {{ $t('continue') }}
        <span class="icon-arrow-right text-[24px] leading-[24px]"
        /></CommonButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRegionStore } from '~/store/region'
import { useOrderStore } from "~/store/order";
import type { TForm } from '~/composables/useForm'
import * as pkg from 'vue-toastification'
import { debounce } from '~/helpers'
const { useToast } = pkg

const toast = useToast()
interface Props {
  step?: number
  form: TForm<any>
  nextButtonActive: boolean
  orderLoading: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const { form } = unref(props)
const { values, $v } = form
const regionStore = useRegionStore()
const orderStore = useOrderStore()
const router = useRouter()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const emit = defineEmits(['submit', 'back'])
const map = ref<any>([69.26, 41.31])
const mapOptions = ref([])

// #RegionFunc

const regionFetch = () => {
  regionStore.fetchRegion()
}

const districtFetch = () => {
  regionStore.fetchDistrict(
    {
      region: form.values.location.region?.id,
    }
  )
}
const getCoords = (e: Array<any>) => {
  map.value = [e[1], e[0]]
}
watch(
  () => form.values.location.region,
  () => {
    regionStore.fetchDistrict({ region: form.values.location?.region?.id })
    form.values.location.district = {}
  },
  { deep: true }
)
watch(
  () => map,
  () => {
    const longitude = map.value?.[1];
    const latitude = map.value?.[0];

    useFetch(
      `https://maps-dev.commeta.io/nominatim/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        method: 'GET',
      }
    ).then((res) => {
      form.values.location.address = res?.data?.value?.display_name;
      form.values.location.latitude = res?.data?.value?.lat.slice(0, 7)
      form.values.location.longitude = res?.data?.value?.lon.slice(0, 7)
    });
  },
  {
    deep: true,
  }
);


const backFunc = () => {
  router.push(localePath('/basket'))
}

const nextFunc = () => {
  form.$v.value.location.$touch()
  if (!form.$v.value.location.$invalid) {
    emit('submit', form.values.location)
    form.$v.value.location.$reset()
  } else {
    if (!form.values.location.latitude || !form.values.location.longitude) {
      toast.error(t('choose_map'))
    }
  }
}
const updateValue = (a: string[]) => {
  map.value = a
}
onMounted(() => {
  regionStore.fetchRegion()
})
const options = computed(() => {
  const res = ref([])
  if(mapOptions.value?.length) {
    res.value = mapOptions.value.map((el) => {
      return {
        title: el?.display_name,
        coords: [el?.lon, el?.lat],
      }
    })
    return res.value
  }
  return mapOptions.value
})
watch(
  () => form.values.location.address,
  (newValue) => {
    if (newValue) {
      debounce('search-map', () => {
        useFetch(
          `https://maps-dev.commeta.io/nominatim/search?q=${newValue}&format=json&addressdetails=1&limit=5`,
          {
            method: 'GET',
          }
        ).then((res) => {
          mapOptions.value = res?.data?.value
        })
      })
    }
  }
)

const nextActive = computed(() => {
  return !(form.values.location.district?.id &&
    form.values.location.region?.id &&
    form.values.location.address
  )
})
</script>
<style>
.warner {
  background: #FFFFFF;
  border: 1px solid #BEF1D6;
  border-radius: 6px;
}
</style>

