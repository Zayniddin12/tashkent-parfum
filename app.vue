<template>
  <div>
    <NuxtLayout>
      <!--    <transition name="fade" mode="out-in">-->
      <main class="main">
        <NuxtPage />
      </main>

      <!--    </transition>-->
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { checkMobile } from "#imports";
import 'swiper/css'

const authStore = useAuthStore()
const { data } = await useAsyncData('init', async () => authStore.authInit())

checkMobile()

// if ('setup' in route.query) {
//   throw new Error('error in setup')
// }
// if ('mounted' in route.query) {
//   onMounted(() => {
//     throw new Error('error in mounted')
//   })
// }
</script>
