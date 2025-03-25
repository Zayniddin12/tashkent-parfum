<template>
  <div
    class="bg-white sm:hidden p-4 flex-center-between border-b border-black/[5%]"
  >
    <div class="flex-y-center gap-4">
      <div
        class="size-[56px] rounded-xl relative overflow-hidden download-app-shadow shrink-0"
      >
        <img
          src="/images/app-icon.svg"
          alt="parfum-app"
          class="size-full object-contain"
        />
      </div>
      <div>
        <p class="text-base leading-122 font-semibold">Toshkent parfum</p>
        <p class="text-xs leading-130 text-gray mt-0.5">
          {{ $t('download_app') }}
        </p>
      </div>
    </div>

    <a
      href="https://app.toshkent-parfyum.uz"
      target="_blank"
      class="px-4 py-2 bg-red rounded-2xl transition-300 text-white text-xs !leading-4 font-semibold"
    >
      {{ $t('view') }}
    </a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
