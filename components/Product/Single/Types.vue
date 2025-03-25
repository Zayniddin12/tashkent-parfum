<template>
  <div class="!overflow-x-hidden">
    <div v-if="loading" class="pt-4 pb-5">
      <CommonBlockPreloader
        :loading="loading"
        width="40%"
        height="26px"
        margin="0 0 12px"
      />
      <div class="flex items-center gap-3">
        <CommonBlockPreloader
          v-for="item in 6"
          :key="item"
          :loading="loading"
          width="44px"
          height="44px"
        />
      </div>
      <CommonBlockPreloader
        :loading="loading"
        width="30%"
        height="26px"
        margin="16px 0 12px"
      />
      <div class="flex items-center gap-3">
        <CommonBlockPreloader
          v-for="item in 6"
          :key="item"
          :loading="loading"
          width="65px"
          height="36px"
        />
      </div>
    </div>
    <div v-else class="pt-4 pb-5">
      <h2 class="text-dark font-semibold">
        {{ $t('type') }}:
        <span class="text-gray-200 font-normal">
          {{ single?.product_group_title }}
        </span>
      </h2>
      <div class="mt-3">
        <client-only>
          <swiper
            v-if="group?.length > 1"
            :spaceBetween="8"
            :slides-per-view="'auto'"
          >
            <swiper-slide
              v-for="(item, index) in group"
              :key="index"
              class="rounded-md p-1 cursor-pointer text-dark !w-11 !h-11 transition-200 hover:border-red"
              :class="
                item?.slug === $route.params?.slug
                  ? 'border-red border-[2px]'
                  : 'border-gray-400 border'
              "
              @click="openWindow(`/products/${item?.slug}`)"
            >
              <img
                v-if="item?.images[0]?.small"
                :alt="item?.title"
                class="w-full h-full object-cover"
                :src="item?.images[0]?.small"
              />
              <img
                v-else
                src="/images/defaults/image.png"
                alt="image"
                class="w-full h-full object-contain bg-white"
              />
            </swiper-slide>
          </swiper>
        </client-only>
      </div>
      <h2 class="text-dark font-semibold mt-4">
        {{ $t('capacity') }}:
        <span class="text-gray-200 font-normal">
          {{ Number(single?.unit_value).toFixed(2) }} {{ single?.unit?.title }}
        </span>
      </h2>
      <div class="mt-3">
        <NuxtLink
          :to="localePath({ path: `/products/${single?.slug}` })"
          class="rounded-md p-1 cursor-pointer text-dark flex-center !w-fit !px-3 !h-9 border-red border-[2px]"
        >
          {{ Number(single?.unit_value).toFixed(2) }} {{ single?.unit?.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TProduct } from '~/types/products'
import type { TProductSingle } from '~/types/ProductSingle'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs } from 'swiper/modules'

interface Props {
  group: TProduct[]
  loading: boolean
  single: TProductSingle
}
defineProps<Props>()

const { locale } = useI18n()

const modules = [Thumbs]

const settings = {
  breakpoints: {
    1440: {
      spaceBetween: 12,
    },
    1200: {
      spaceBetween: 12,
    },
    1000: {
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 8,
    },
    500: {
      slidesPerView: 14,
      spaceBetween: 8,
    },
    375: {
      slidesPerView: 8,
      spaceBetween: 8,
    },
  },
}

const openWindow = (url: string) => {
  window.open(url, '_self')
}
// const loading = ref(true)
</script>
