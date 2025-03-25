<template>
  <header
    data="header"
    class="header md:sticky relative top-0 w-screen z-40 bg-white"
  >
    <!--  HEADER CONTACT  -->
    <HeaderContact />

    <!--  HEADER MAIN  -->
    <div class="bg-white py-4 hidden lg:block">
      <div class="container flex items-center justify-between space-x-8">
        <div class="flex items-center flex-grow">
          <CommonLogo class="mr-6" />
          <LazyHeaderBurger
            class="!mr-4 !py-2.5 !px-3"
            :is-active="showMenu"
            @toggle="toggleMenu"
          />
          <HeaderSearch class="flex-grow z-40" :data="searchResult" />
        </div>
        <div class="flex-y-center space-x-8">
          <div class="flex-center space-x-5">
            <div
              class="transition-200 group flex-center flex-col text-gray-100 hover:text-red cursor-pointer"
              v-for="(item, idx) in computedHeaderActions"
              :key="idx"
              @click="headerAction(item?.link, item?.lock)"
            >
              <div class="relative w-7 h-7">
                <i v-if="item.name === 'orders'">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.339 5.95634L19.2057 6.93592C21.2139 7.98979 22.218 8.51672 22.7756 9.4636C23.3332 10.4105 23.3332 11.5887 23.3332 13.9452V14.0544C23.3332 16.4109 23.3332 17.5892 22.7756 18.5361C22.218 19.483 21.2139 20.0099 19.2057 21.0638L17.339 22.0433C15.7005 22.9032 14.8812 23.3332 13.9998 23.3332C13.1185 23.3332 12.2992 22.9032 10.6606 22.0433L8.79398 21.0638C6.78576 20.0099 5.78164 19.483 5.22407 18.5361C4.6665 17.5892 4.6665 16.4109 4.6665 14.0544V13.9452C4.6665 11.5887 4.6665 10.4105 5.22407 9.4636C5.78164 8.51672 6.78576 7.98979 8.79398 6.93592L10.6606 5.95634C12.2992 5.09645 13.1185 4.6665 13.9998 4.6665C14.8812 4.6665 15.7005 5.09645 17.339 5.95634Z"
                      stroke="#6F6F6F"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      class="group-hover:stroke-red transition-200 !duration-[0]"
                    />
                    <path
                      d="M22.4001 9.8L18.6668 11.6667M14.0001 14L5.6001 9.8M14.0001 14V22.8667M14.0001 14C14.0001 14 16.5599 12.7201 18.2001 11.9C18.3823 11.8089 18.6668 11.6667 18.6668 11.6667M18.6668 11.6667V14.9333M18.6668 11.6667L9.8001 7"
                      stroke="#6F6F6F"
                      class="group-hover:stroke-red transition-200 !duration-[0]"
                      stroke-width="1.75"
                      stroke-linecap="round"
                    />
                  </svg>
                </i>
                <i v-else :class="item.icon" class="text-[28px] w-7 h-7"></i>
                <span
                  v-if="item.badgeCount"
                  class="absolute -top-1 right-[-6px] h-[17px] bg-red rounded-[21px] text-white shadow-[0_2px_12px_rgba(246,37,89,0.3)] text-[13px] flex-center py-0.5 px-[5.5px]"
                >
                  {{ item.badgeCount }}
                </span>
              </div>
              <span class="text-xs leading-130 hidden lg:block">
                {{ t(item?.title || '') }}
              </span>
            </div>
          </div>

          <transition name="fade" mode="out-in">
            <CommonButton
              v-if="!user"
              text-class="flex-center"
              :text="t('login')"
              class="!py-2.5 !px-5"
              @click="emit('open-auth')"
            >
              <template #pre-icon>
                <i class="icon-login text-2xl mr-1"></i>
              </template>
            </CommonButton>

            <HeaderProfileDropdown v-else @logout="showLogoutModal = true" />
          </transition>
        </div>
      </div>
    </div>

    <!--  MOBILE RESPONSIVE-->

    <LayoutNavigation class="block lg:hidden" @open-auth="$emit('open-auth')" />
    <!--  MOBILE RESPONSIVE-->

    <!--  CATEGORIES  -->
    <HeaderCategories />

    <!--  MENU  -->
    <div
      class="transition-300 w-screen h-screen header-menu fixed top-[144px] bg-white flex-grow z-10 pt-16 pb-6"
      :class="
        showMenu
          ? 'opacity-100 visible translate-y-0 rotate-x-0'
          : 'opacity-0 invisible -translate-y-4 -rotate-x-45'
      "
    >
      <div
        class="overflow-y-auto"
        :style="height ? { height: `${height}px` } : ''"
      >
        <div
          id="catalog"
          class="container grid grid-cols-4 gap-y-[50px] overflow-auto pb-auto"
        >
          <div
            class="h-fit"
            v-for="(category, prentIdx) in categoriesStore.headerCategories"
            :key="prentIdx"
          >
            <NuxtLink
              :to="
                localePath({
                  path: '/products',
                  query: { sections: category?.id, keep: true },
                })
              "
              class="transition-200 font-bold text-xl leading-[120%] inline-block mb-6 text-dark hover:text-red"
              @click="toggleMenu(false)"
            >
              {{ category.title }}
            </NuxtLink>

            <NuxtLink
              v-for="(child, idx) in category.categories"
              :key="idx"
              :to="
                localePath({
                  path: '/products',
                  query: { sections: child?.id, keep: true },
                })
              "
              class="transition-200 font-semibold text-base leading-130 text-dark mb-3 last:mb-0 block hover:text-red hover:translate-x-1"
              @click="toggleMenu(false)"
            >
              {{ child.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="bg-white sticky top-0 z-30">
    <HeaderSearch
      :class="
        showMenu
          ? ' opacity-0 invisible -translate-y-4 -rotate-x-45 !hidden md:!hidden'
          : 'opacity-100 visible translate-y-0 rotate-x-0 !block md:!hidden'
      "
      class="flex-grow z-40 container py-4"
      :data="searchResult"
    />
  </div>
  <!--  LOGOUT MODAL  -->
  <CommonModalsLogout
    :show="showLogoutModal"
    @close="showLogoutModal = false"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import CommonLogo from '../../Common/Logo/Logo.vue'
import { searchResult } from '~/data/temp'
import { useAuthStore } from '~/store/auth'
import { useOrderStore } from '~/store/order'
import { useCategoriesStore } from '~/store/categories'
import { useScroll } from '~/composables/useScroll'
import { useSavedStore } from '~/store/saved'

interface IAddress {
  title: string
  coords: number[]
}

const emit = defineEmits<{
  (e: 'open-auth'): void
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const savedStore = useSavedStore()
const router = useRouter()
const { $event } = useNuxtApp()

const user = computed(() => authStore.user)
const route = useRoute()
const height = ref(0)
const catalogHeight = ref()
const { hideOverflow, showOverflow } = useScroll()

const categoriesStore = useCategoriesStore()
categoriesStore.fetchHeaderCategories()
categoriesStore.fetchHeaderList()

const showMenu = ref(false)
function toggleMenu(newValue: boolean) {
  newValue ? hideOverflow() : showOverflow()
  showMenu.value = newValue
}

const computedHeaderActions = computed(() => headerActions())

const showLogoutModal = ref(false)
const headerAction = (link: string, lock: boolean) => {
  if (!authStore.user && lock) {
    $event('open-required')
  } else {
    router.push(localePath(link))
  }
}
watch(
  () => route.path,
  () => toggleMenu(false)
)
watch(
  () => locale.value,
  () => {
    categoriesStore.fetchHeaderCategories()
    categoriesStore.fetchHeaderList()
  }
)
// watch(() => height.value, (val) => {
//   console.log('height changed', val)
// })
onMounted(() => {
  if (process.client) {
    window.addEventListener('resize', () => {
      height.value = window.innerHeight - 260
      catalogHeight.value = document.getElementById('catalog')?.clientHeight
    })
    height.value = window.innerHeight - 260
    catalogHeight.value = document.getElementById('catalog')?.clientHeight
  }
})

function headerActions() {
  return [
    {
      name: 'orders',
      icon: 'icon-box',
      title: 'my_orders',
      link: '/my-orders',
      badgeCount: orderStore.ordersTotal,
      lock: true,
    },
    {
      name: 'cart',
      icon: 'icon-basket',
      title: 'basket',
      link: '/basket',
      badgeCount: orderStore.getCartTotal(),
      lock: false,
    },
    {
      name: 'favourites',
      icon: 'icon-heart',
      title: 'favourites',
      link: '/saved',
      badgeCount: savedStore.total,
      lock: false,
    },
  ]
}
</script>

<style scoped>
header.header {
  filter: drop-shadow(0 8px 44px rgba(56, 56, 56, 0.12));
}
</style>
