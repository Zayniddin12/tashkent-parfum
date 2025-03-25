<template>
  <CommonModalsModal :show="show" @close="emit('close')" inside>
    <div class="p-5">
      <p class="text-xl leading-6 font-bold text-dark">
        {{ $t('successful') }}
      </p>
    </div>

    <div class="mt-5 pr-5 pl-5 pb-5">
      <div class="flex-y-center space-x-3">
        <img src="/images/ordered-logo.svg" alt="ordered logo" />
        <p class="text-xl leading-130 text-dark font-bold text-left">
          {{
            paymentType === 1
              ? $t('payment_with_cash')
              : $t('successfully_ordered')
          }}
        </p>
      </div>
      <div
        class="bg-gray-500 p-2 md:p-4 rounded-lg mt-4 md:mt-12 flex flex-wrap w-full"
      >
        <div
          class="flex flex-col items-start mb-3"
          :class="paymentType === 1 ? 'w-[47%]' : 'w-full'"
        >
          <p class="font-semibold text-xs text-gray-200 leading-130 mb-1">
            {{ $t('number_order') }}:
          </p>
          <p class="font-bold leading-130 text-dark flex items-end">
            <span
              class="icon-basket-solid text-dark_green text-[24px] leading-[24px] mr-0.5"
            />{{ formatNumber(data?.id) }}
          </p>
        </div>
        <div class="flex flex-col items-start w-[47%]">
          <p class="font-semibold text-xs text-gray-200 leading-130 mb-1">
            {{ $t('total') }}:
          </p>
          <p class="font-bold leading-130 text-dark flex items-end">
            <span
              class="icon-money-wallet text-dark_green text-[24px] leading-[24px] mr-0.5"
            />{{ formatNumber(parseInt(data?.price)) }} UZS
          </p>
        </div>
        <div class="flex flex-col items-start w-[47%]" v-if="paymentType !== 1">
          <p class="font-semibold text-xs text-gray-200 leading-130 mb-1">
            {{ $t('cashback') }}:
          </p>
          <p class="font-bold leading-130 text-dark flex items-end">
            <span
              class="icon-money-circle text-dark_green text-[24px] leading-[24px] mr-0.5"
            />+{{ formatNumber(parseInt(data?.cashback)) }} UZS
          </p>
        </div>
      </div>

      <CommonButton
        class="w-full mt-6"
        :text="$t('status_order')"
        @click="showStatus(data?.id)"
      />
      <CommonButton
        class="w-full mt-2"
        :text="$t('go_home')"
        @click="emit('go-main')"
        variant="light"
      />
    </div>
  </CommonModalsModal>
</template>
<script setup lang="ts">
import { formatNumber } from '~/helpers'
import { useRouter } from '#app'

interface Props {
  show: boolean
  data?: object
  paymentType: number
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'go-main'): void
}>()
const localePath = useLocalePath()
const router = useRouter()
const showStatus = (id: number) => {
  emit('close')
  setTimeout(() => {
    router.push(localePath(`/order/${id}`))
  })
}
</script>
<style>
.modal-right-side {
  background: linear-gradient(192.83deg, #eb2859 -6.24%, #792036 92.34%);
}
</style>
