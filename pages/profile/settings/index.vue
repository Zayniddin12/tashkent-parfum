<template>
  <div class="grid md:flex-y-center gap-4 md:gap-6">
    <NuxtLink
      :to="localePath('/profile/settings/change-password')"
      class="bg-white p-5 rounded-xl flex-y-center gap-2 w-full cursor-pointer group shadow-card transition-300"
    >
      <i
        class="icon-lock-unlocked text-2xl text-gray-200 group-hover:text-red transition-300"
      />
      <p
        class="text-xl text-dark leading-130 font-semibold group-hover:text-red transition-300"
      >
        {{ $t('change_password') }}
      </p>
    </NuxtLink>
    <NuxtLink
      :to="localePath('/profile/settings/change-number')"
      class="bg-white p-5 rounded-xl flex-y-center gap-2 w-full cursor-pointer group shadow-card transition-300"
    >
      <i
        class="icon-phone text-2xl text-gray-200 group-hover:text-red transition-300"
      />
      <p
        class="text-xl text-dark leading-130 font-semibold group-hover:text-red transition-300"
      >
        {{ $t('change_phone') }}
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>

<style scoped>
.shadow-card:hover {
  box-shadow: 0 4px 19px rgba(0, 0, 0, 0.05);
}
</style>
