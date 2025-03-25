<template>
  <div
    class="overflow-hidden rounded-lg border border-gray-400 relative flex-grow-[1]"
  >
    <CommonBadgeDiscount
      v-if="discount && discount !== '0.00'"
      class="absolute z-20 left-2.5 top-2.5"
    />
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      v-bind="settings"
      :thumbs="{ swiper: thumbsSwiper }"
      class="mySwiper2 w-full aspect-square h-full"
    >
      <swiper-slide
        v-for="(i, idx) in images"
        :key="idx"
        @click="showModal = true"
        class="cursor-pointer active:cursor-grabbing h-full flex-center"
      >
        <img
          v-if="i?.compressed"
          :alt="altFormula"
          class="w-full h-auto object-cover"
          :src="i?.compressed"
        />
        <img
          v-else
          src="/images/defaults/image.png"
          alt="image"
          class="w-full h-full object-contain bg-white"
        />
      </swiper-slide>
    </swiper>
  </div>
  <swiper
    v-if="images?.length"
    @swiper="setThumbsSwiper"
    :spaceBetween="8"
    slidesPerView="auto"
    centered-slides
    centered-slides-bounds
    centerInsufficientSlides
    :slidesOffsetAfter="18"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper md:w-[290px] gallery-thumb-slider relative mt-2"
  >
    <swiper-slide
      v-for="(i, idx) in images"
      :key="idx"
      class="border !w-[2rem] !h-[2rem] box-border rounded-md border-gray-400 overflow-hidden cursor-pointer !hidden md:!block"
    >
      <img
        v-if="i?.compressed"
        :alt="altFormula"
        class="transition-200 w-full h-full object-cover opacity-70 hover:opacity-100"
        :src="i?.compressed"
      />
      <img
        v-else
        src="/images/defaults/image.png"
        alt="image"
        class="w-full h-full object-contain bg-white"
      />
    </swiper-slide>
  </swiper>

  <CommonModalsGallery
    v-if="images?.length > 1"
    :show="showModal"
    :images="images"
    @close="showModal = false"
  />
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCube, Thumbs, FreeMode } from 'swiper/modules'
import type { SwiperEvents } from 'swiper/types'

type TImages = {
  default: string
  extra_small: string
  large: string
  medium: string
  small: string
}
interface Props {
  images?: TImages[]
  loading?: boolean
  discount?: string
  altFormula?: string
}
defineProps<Props>()

const thumbsSwiper = ref<SwiperEvents>()
const setThumbsSwiper = (swiper: SwiperEvents) => {
  if (Image) {
    thumbsSwiper.value = swiper
  }
}

const modules = [FreeMode, Thumbs]

const settings = {
  spaceBetween: 10,
  modules,
}

const showModal = ref(false)
</script>

<style>
.swiper-slide {
  @apply !transition-colors !duration-200;
}
.swiper-slide-thumb-active {
  @apply !border-red;
}

.swiper-slide-thumb-active img {
  @apply !opacity-100;
}

.gallery-thumb-slider {
  @apply relative after:content-[''] after:absolute after:top-0 after:z-10 after:right-0 after:w-[18px] after:h-full after:bg-[linear-gradient(270deg,_#FFFFFF_-6.25%,_rgba(255,_255,_255,_0)_153.12%)];
}
</style>
