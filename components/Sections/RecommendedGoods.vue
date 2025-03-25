<template>
  <div class="container">
    <CommonSectionsSectionHead
      v-bind="{ title }"
      :section-link="link"
      :section-title="linkTitle"
    />
    <div
      v-if="!loading"
      class="grid grid-cols-2 !gap-2 md:gap-0 lg:grid-cols-6 md:gap-x-5 gap-y-3 md:space-y-0"
    >
      <CardsProduct
        v-for="(item, index) in data"
        :key="'D' + index"
        :card="item"
      />
    </div>
    <div
      v-else
      class="grid grid-cols-2 !gap-2 md:gap-0 lg:grid-cols-6 md:gap-x-5 gap-y-3 md:space-y-0"
    >
      <CardsTopBrands v-for="index in 6" :key="'C' + index" loading />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TProduct } from '~/types/products'

interface Props {
  title: string
  linkTitle: string
  link: string
  loading?: boolean
  data: TProduct[]
}
defineProps<Props>()
</script>
