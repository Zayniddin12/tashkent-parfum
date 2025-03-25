<template>
  <div
    class="bg-white md:max-w-[278px] md:py-4 md:pl-4 rounded-xl overflow-y-scroll pt-10"
  >
    <div class="flex items-center justify-between mb-5 pr-4">
      <h5 class="text-xl text-dark font-bold leading-125">
        {{ $t('filter_title') }}
      </h5>
      <button
        class="text-base text-gray-200 font-normal leading-125 duration-200 hover:text-dark hidden lg:block"
        @click="clearFilter"
      >
        {{ $t('clear_filter') }}
      </button>
      <button @click="$emit('close')" class="lg:hidden">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.4"
            cx="13.9997"
            cy="13.9997"
            r="11.6667"
            stroke="#6F6F6F"
            stroke-width="1.75"
          />
          <path
            d="M17.5 10.5L10.5 17.5M10.5 10.5L17.4999 17.5"
            stroke="#6F6F6F"
            stroke-width="1.75"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
    <div class="space-y-5">
      <ProductFilterCollapse v-bind="{ data: filterData, clearTrigger }" />
    </div>
    <div class="py-5 pr-4 border-b border-solid border-gray-500">
      <FormToggle
        label-class="text-base text-dark font-bold leading-125"
        name="discount"
        :modelValue="discount"
        :label="$t('goods_on_sale')"
        @update:modelValue="handleChange"
      />
    </div>
    <div class="py-5 pr-4">
      <ClientOnly>
        <FormRange
          v-model="price"
          :label="$t('amount_range')"
          :curreny="$t('uzs')"
          label-class="text-base text-dark font-bold leading-125"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import useUpdateRouteQuery from '~/composables/updateRouteQuery'
import { debounce, removeSpaces } from '~/helpers'

import type { IFilterData, IFilterItems } from '~/types/products'
import { useScroll } from '~/composables/useScroll'

interface Props {
  types?: Object
  filterData: IFilterData[]
}
const props = defineProps<Props>()

const router = useRouter()
const { t: $t } = useI18n()

const filterItems = reactive<IFilterData[]>(unref(props.filterData))

const discount = ref(false)
const price = ref<string[]>(['', ''])
const handleChange = (target: boolean) => {
  discount.value = target
  useUpdateRouteQuery('discount', target ? '1' : '')
}

function updatePrice(newValue: string[]) {
  useUpdateRouteQuery('price_gte', removeSpaces(newValue[0]))
  setTimeout(() => {
    useUpdateRouteQuery('price_lte', removeSpaces(newValue[1]))
  }, 100)
}

watch(
  () => price.value,
  (newValue: string[]) => debounce('price', () => updatePrice(newValue)),
  {
    deep: true,
  }
)

function addNewField(list: IFilterData[] | IFilterItems[], parent = false) {
  for (let i = 0; i < list.length; i++) {
    list[i].checked = false

    if (parent) {
      list[i].expanded = false
    }
    if (list[i]?.items) {
      addNewField(list[i].items, true)
    } else if (list[i].categories) {
      addNewField(list[i].categories)
    }
  }
}

watch(
  () => props.filterData,
  () => addNewField(filterItems),
  {
    immediate: true,
  }
)
function toggleMenu(newValue: boolean) {
  newValue ? hideOverflow() : showOverflow()
  showMenu.value = newValue
}
const { hideOverflow, showOverflow } = useScroll()

const showMenu = ref(false)
const clearTrigger = ref(0)
function clearFilter() {
  clearTrigger.value++
  price.value = ['', '']
  discount.value = false
  // setTimeout(() => {
  router.replace({ query: { keep: undefined } })
  // }, 0)
}

onMounted(() => {
  const routeQuery = router.currentRoute.value.query

  discount.value = routeQuery?.discount === '1'

  if (routeQuery.price_gte || routeQuery.price_lte) {
    price.value = [
      (routeQuery?.price_gte as string) ?? '',
      (routeQuery?.price_lte as string) ?? '',
    ]
  }
})
</script>
