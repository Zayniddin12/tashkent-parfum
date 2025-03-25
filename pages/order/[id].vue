<template>
  <div class="container">
    <CommonBreadcrumb v-bind="{ routes }" />
    <div class="mt-4 flex items-center">
      <CommonButton
        class="icon-arrow-left-solid"
        variant="secondary"
        text=""
        @click="$router.go(-1)"
      />
      <h2 class="ml-4 font-bold text-dark text-[32px]">{{ orderId }}</h2>
    </div>
    <div class="grid md:grid-cols-12 gap-6 mt-6 pb-10">
      <div class="md:col-span-8">
        <CommonCheckoutStepper
          :step="stepperStatus"
          :list="orderStatus"
          class="mb-4 !w-full"
        />
        <transition name="fade" mode="out-in">
          <div :key="status">
            <OrderStatus
              v-if="status === 5 || status === 6"
              v-bind="{
                status,
                logs: single?.status_logs,
                loading,
                courier: single?.courier,
              }"
            />
            <div v-else class="bg-white rounded-xl px-5">
              <template v-if="!loading">
                <div v-if="single?.order_products?.length">
                  <CardsOrderCardSingle
                    v-for="(item, index) in single?.order_products"
                    :key="index"
                    :data="item"
                    v-bind="{ loading }"
                  />
                </div>
                <CommonNoData
                  v-else
                  class="py-9"
                  img="/images/no-data/products.svg"
                  :title="$t('no_cards')"
                  :subtitle="$t('no_orders')"
                />
              </template>
              <div v-else>
                <CardsOrderCardSingle
                  type="group"
                  v-for="(item, index) in 2"
                  :key="index"
                  :data="item"
                  loading
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="md:col-span-4">
        <CardsOrderCardCheck
          :id="single?.id"
          :list="checkList"
          v-bind="{ loading }"
          :status="single?.status"
          class="mb-4"
        />
        <CardsTotal
          v-bind="{ loading }"
          :total="checkData"
          :goods="single?.order_products"
          class="mb-4"
          order
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { OrderSingle } from '~/types/order'
import { orderStatus } from '~/config/global-config'
import { phone } from '~/helpers'

const { t } = useI18n()
const route = useRoute()
const routes = ref([
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('my_orders'),
    route: '/my-orders',
  },
  {
    name: t('history_of_orders'),
    route: '/my-orders/history',
  },
  {
    name: route?.params?.id,
  },
])

const orderId = computed(() => {
  return `# ${route?.params?.id}`
})

const single = ref<OrderSingle>()
const loading = ref(true)

fetchSingleOrder(+route?.params?.id)

function fetchSingleOrder(id: number) {
  loading.value = true
  return new Promise((resolve, reject) => {
    useFetcher<OrderSingle>(`orders/${id}/`, {
      method: 'GET',
    })
      .then((res) => {
        if (res?.data) {
          single.value = res?.data
          resolve(res?.data)
        }
        if (res?.error) {
          reject(res?.error)
          showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }
      })
      .finally(() => {
        setTimeout(() => {
          loading.value = false
        }, 400)
      })
  })
}

const status = computed<number | undefined>(() => {
  return single.value?.status
})

const stepperStatus = computed<number>(() => {
  if (single.value?.status === 5) {
    return 2
  } else if (single.value?.status === 6) {
    return 3
  } else {
    return 1
  }
})
// Check list
const checkList = computed(() => {
  return [
    {
      title: 'receiver',
      value: single.value?.receiver_fish,
    },
    {
      title: 'phone',
      value: phone('+998' + single.value?.receiver_phone),
    },
    {
      title: 'address',
      value: single.value?.address,
    },
    {
      title: 'products_count',
      value: single.value?.product_count,
    },
  ]
})
const checkData = computed(() => {
  return {
    cacheback_earning: single.value?.order_cashback,
    cashback_price: single.value?.cashback_price,
    delivery_price: single.value?.delivery_price,
    delivery_type: getDeliveryType(single.value?.delivery_type),
    nds: single.value?.nds?.percent,
    nds_price: single.value?.nds?.price,
    total_order_discount_price: single.value?.discount,
    total_order_price: single.value?.order_price,
    total_price: single.value?.order_price,
    total_real_order_price: single.value?.total_price,
  }
})
const getDeliveryType = (id: number) => {
  if (id === 1) {
    return 'BTS delivery to office'
  } else {
    return 'Own delivery'
  }
}
</script>
