<template>
  <NuxtLink :to="localePath('/')" class="cursor-pointer">
    <img
      src="/images/logo.svg"
      alt="tashkent-parfum"
      class="transition-200 w-full h-full"
      :class="dark ? 'dark-logo' : light ? 'white-logo' : 'logo'"
    />
  </NuxtLink>
</template>

<script lang="ts" setup>
export interface Props {
  dark?: boolean
  light?: boolean
}
defineProps<Props>()
const localePath = useLocalePath()
</script>

<style scoped>
.logo {
  filter: invert(32%) sepia(48%) saturate(4467%) hue-rotate(327deg)
    brightness(93%) contrast(109%);
}

.dark-logo {
  filter: invert(21%) sepia(0%) saturate(0%) hue-rotate(340deg) brightness(92%)
    contrast(92%);
}
.white-logo {
  filter: invert(100%) sepia(0%) saturate(66%) hue-rotate(180deg)
    brightness(100%) contrast(100%);
}

.dark-logo:hover {
  filter: invert(32%) sepia(48%) saturate(4467%) hue-rotate(327deg)
    brightness(93%) contrast(109%) !important;
}
</style>
