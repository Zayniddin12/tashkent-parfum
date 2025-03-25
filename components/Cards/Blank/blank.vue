<template>
  <div class="bg-white rounded-xl p-6">
    <CommonBlockPreloader
      :width="preloaderWidth"
      :preloader-class="preloaderClass"
      height="32px"
      :loading="loading"
    >
      <h4 :class="titleClass" class="blank-title" v-if="title">{{ title }}</h4>
    </CommonBlockPreloader>

    <div :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  titleClass?: string
  contentClass?: string
  loading?: boolean
  preloaderWidth?: string
  preloaderClass?: string
}
withDefaults(defineProps<Props>(), { preloaderWidth: '200px' })
</script>

<style>
.blank-title {
  @apply font-bold text-2xl md:text-[2rem] text-dark;
}
</style>
