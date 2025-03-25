<template>
  <div class="flex-center flex-col">
    <img
      v-if="img"
      :src="img"
      alt="no-data"
      :class="imgStyles"
      class="mb-7"
    />
    <h3 v-if="title" class="font-bold text-2xl leading-130 text-dark mb-1">
      {{ title }}
    </h3>
    <p class="font-semibold text-sm leading-130 text-gray-100">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  title: string
  subtitle: string
  img: string
  imgStyles?: string
}
defineProps<Props>()
</script>

<style scoped></style>
