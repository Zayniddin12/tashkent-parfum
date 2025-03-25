<template>
  <div
    class="grid items-center gap-5 !mt-5 md:!mt-0 md:gap-0 grid-cols-1-max mb-5 space-x-2"
  >
    <p class="section-title" v-if="title">
      {{ $t(title ?? '') }}
    </p>
    <slot>
      <div
        v-if="sectionLink"
        :key="sectionLink"
        class="flex items-center group space-x-1 cursor-pointer"
      >
        <NuxtLink
          :to="sectionLink"
          class="text-gray-200 font-semibold text-base leading-130 duration-300 group-hover:text-red hidden md:block"
        >
          {{ $t(sectionTitle ?? '') }}
        </NuxtLink>
        <NuxtLink
          :to="sectionLink"
          :key="sectionLink"
          class="text-gray-200 font-semibold text-sm leading-130 duration-300 group-hover:text-red md:hidden"
        >
          {{ $t('all') }}
        </NuxtLink>
        <span
          class="text-2xl font-bold icon-arrow-right text-gray-200 duration-300 group-hover:text-red"
        />
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  sectionLink?: string
  sectionTitle?: string
}
withDefaults(defineProps<Props>(), {})
const localePath = useLocalePath()
</script>
