<template>
  <div
    class="md:grid grid-cols-12 py-5 item h-full group transition-200 ease-in-out"
  >
    <div class="flex col-span-8">
      <CommonBlockPreloader
        v-bind="{ loading }"
        class="w-[120px] max-h-[120px] mr-2 md:mr-6 flex-shrink-0"
      >
        <CardsProductImageSlider :images="data?.product?.images" />
      </CommonBlockPreloader>
      <!--  Card info  section    -->
      <div class="pl-2">
        <CommonBlockPreloader
          :loading="loading"
          height="23px"
          max-width="300px"
        >
          <NuxtLink
            :to="localePath(`/products/${data?.product?.slug}`)"
            class="text-dark font-bold leading-130 text-xl line-clamp-2 transition-200 ease-in-out group-hover:text-red"
          >
            {{ data?.title }}
          </NuxtLink>
        </CommonBlockPreloader>
        <div class="flex items-center gap-[8px]">
          <CommonBlockPreloader
            :loading="loading"
            height="23px"
            max-width="300px"
            margin="8px 4px 0 0"
            class="!block"
          >
            <CommonRating
              :rate="data?.product?.rate"
              class="gap-2"
              star-class="!text-lg"
            />
          </CommonBlockPreloader>
          <CommonBlockPreloader :loading="loading" height="23px" width="10%">
            <p class="text-[#9E9EA5] text-[14px] leading-130 font-normal">
              {{ data?.product?.comment_count }}
            </p>
          </CommonBlockPreloader>
        </div>
      </div>
    </div>
    <!-- Card price section     -->
    <div
      class="col-span-4 md:pl-4 md:border-l border-solid border-gray-500 flex flex-col grow-[3] h-full"
    >
      <CommonBlockPreloader
        v-bind="{ loading }"
        height="40px"
        width="200px"
        content-wrapper-class="flex flex-col justify-between"
        class="w-full h-full"
      >
        <div class="mt-4 md:mt-0">
          <h2 class="text-xl font-bold text-dark">
            {{ formatNumber(price?.sale_price) }} UZS
          </h2>
          <p class="text-xs text-gray-200">
            {{ formatNumber(price?.sale_price) }} UZS X {{ data?.amount }}
          </p>
          <div v-if="price?.discount" class="flex items-center mt-2">
            <CommonBadgeDiscount class="!w-6 !h-4 !text-sm" />
            <p class="text-xs text-green ml-1">
              {{ formatNumber(price?.discount) }}
            </p>
          </div>
        </div>
      </CommonBlockPreloader>
      <CommonButton
        v-if="!data?.product?.has_comment && data?.product?.can_comment"
        :text="$t('add_review')"
        variant="light"
        class="w-2/3"
        @click="showModal = true"
      />
    </div>
  </div>
  <CommonModalsAddReview
    :show="showModal"
    @close="showModal = false"
    @send="sendReview"
  />
</template>

<script setup lang="ts">
import { formatNumber, formatMoneyDecimal } from '~/helpers'
import  type { IOtherProducts } from '~/types/order'
import type { TReviewPayloadData } from '~/types/feedback'
import * as pkg from 'vue-toastification'

interface Props {
  type: string
  data: IOtherProducts
  loading?: boolean
  route?: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'delete', value: number): void
  (e: 'submit'): void
}>()

const { useToast } = pkg

const toast = useToast()
const { t } = useI18n()
const localePath = useLocalePath()

const price = computed(() => {
  const sale = parseInt(props.data?.product?.sale_price)
  const cost = parseInt(props.data?.product?.price)
  const discount = sale ? cost : 0
  const sale_price = sale ? sale : cost
  return {
    discount,
    sale_price,
  }
})
const images = computed(() => {
  return []
})
const showModal = ref(false)

const sendReview = async (data: TReviewPayloadData) => {
  data.product = props.data?.product?.id
  try {
    const { data: resData, error } = await useFetcher(`products/comment/`, {
      method: 'POST',
      body: { ...data },
    })
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message)
      } else {
        toast.error(error.data?.errors[0]?.message)
      }
    } else {
      toast.success(t('your_comment_added'))
      showModal.value = false
    }
  } catch (err) {}
}
</script>

<style scoped>
.item:not(:last-child) {
  border-bottom: 1px solid #f7f8fa;
}
</style>
