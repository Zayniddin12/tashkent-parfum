<template>
  <div class="container mx-auto">
    <CommonBreadcrumb v-bind="{ routes }" class="mt-3" />

    <div class="bg-white rounded-2xl p-3 md:p-10 mt-8" v-if="dataStatic">
      <h2
        class="text-[#383838] leading-130 text-2xl md:text-3xl lg:text-4xl font-bold"
      >
        {{ dataStatic.data.title }}
      </h2>
      <h3
        class="mt-3 text-[#383838] leading-130 font-bold text-xl md:text-[28px] lg:text-[32px]"
      >
        {{ dataStatic.data.second_title }}
      </h3>
      <Static v-if="dataStatic" :data="dataStatic.data.body" />
    </div>
    <div class="products mt-8 pb-16">
      <CommonSectionsSectionHead
        :title="'static_recommend'"
        section-link="/products"
        :section-title="'all_product'"
      />

      <div
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 mt-5"
        v-if="dataRecommended"
      >
        <CardsProduct
          v-for="(item, index) in dataRecommended"
          :key="index"
          :card="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '~/store/products'

import { useFetcher } from '~/composables/fetcher'

const route = useRoute()

const productStore = useProductsStore()

const { t } = useI18n()

useHead({
  title: t('static'),
})

const dataRecommended = computed(() => productStore.recommendedProducts)

const dataStatic = ref(null)

const routes = ref([
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('static'),
  },
])

const fetchStaticItem = () => {
  useFetcher(`common/staticpages/${route.params.slug}/`)
    .then((res) => {
      dataStatic.value = res

      routes.value[1].name = res.data.title

      if (res.error?.statusCode === 404) {
        showError({ statusCode: 404 })
      }
    })
    .catch((err) => {
      showError({ statusCode: 404 })
    })
}

onMounted(() => {
  productStore.fetchRecommendedProducts()
  fetchStaticItem()
})
</script>

<style scoped>
v-html .bg {
  display: flex;
  gap: 8px;
}
v-html .bg-border {
  width: 6px;
  background-color: #f62559;
  height: auto;
  border: 2px solid #f62559;
}
</style>
