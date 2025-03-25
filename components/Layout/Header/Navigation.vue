<template>
  <header>
    <div
      class="container flex items-center pt-6"
      :class="showMenu ? 'pb-4' : 'pb-4'"
    >
      <ResponsiveBurger
        class="responsive__burger"
        :is-active="showMenu"
        @toggle="toggleMenu"
      />

      <div
        class="!flex !justify-between items-center w-full"
        :class="
          showMenu
            ? ' opacity-0 invisible -translate-y-4 -rotate-x-45 !hidden'
            : 'opacity-100 visible translate-y-0 rotate-x-0 !block'
        "
      >
        <CommonLogo class="!w-[76px] !h-[35px] block" />
        <!--        <div class="flex-center space-x-3">-->
        <!--          <div-->
        <!--            class="transition-200 group flex-center flex-col text-gray-100 hover:text-red cursor-pointer"-->
        <!--            v-for="(item, idx) in computedHeaderActions"-->
        <!--            :key="idx"-->
        <!--            @click="headerAction(item.link, item.lock)"-->
        <!--          >-->
        <!--            <div class="relative w-7 h-7">-->
        <!--              <i v-if="item.name === 'orders'">-->
        <!--                <svg-->
        <!--                  width="28"-->
        <!--                  height="28"-->
        <!--                  viewBox="0 0 28 28"-->
        <!--                  fill="none"-->
        <!--                  xmlns="http://www.w3.org/2000/svg"-->
        <!--                >-->
        <!--                  <path-->
        <!--                    d="M17.339 5.95634L19.2057 6.93592C21.2139 7.98979 22.218 8.51672 22.7756 9.4636C23.3332 10.4105 23.3332 11.5887 23.3332 13.9452V14.0544C23.3332 16.4109 23.3332 17.5892 22.7756 18.5361C22.218 19.483 21.2139 20.0099 19.2057 21.0638L17.339 22.0433C15.7005 22.9032 14.8812 23.3332 13.9998 23.3332C13.1185 23.3332 12.2992 22.9032 10.6606 22.0433L8.79398 21.0638C6.78576 20.0099 5.78164 19.483 5.22407 18.5361C4.6665 17.5892 4.6665 16.4109 4.6665 14.0544V13.9452C4.6665 11.5887 4.6665 10.4105 5.22407 9.4636C5.78164 8.51672 6.78576 7.98979 8.79398 6.93592L10.6606 5.95634C12.2992 5.09645 13.1185 4.6665 13.9998 4.6665C14.8812 4.6665 15.7005 5.09645 17.339 5.95634Z"-->
        <!--                    stroke="#6F6F6F"-->
        <!--                    stroke-width="1.75"-->
        <!--                    stroke-linecap="round"-->
        <!--                    class="group-hover:stroke-red transition-200 !duration-[0]"-->
        <!--                  />-->
        <!--                  <path-->
        <!--                    d="M22.4001 9.8L18.6668 11.6667M14.0001 14L5.6001 9.8M14.0001 14V22.8667M14.0001 14C14.0001 14 16.5599 12.7201 18.2001 11.9C18.3823 11.8089 18.6668 11.6667 18.6668 11.6667M18.6668 11.6667V14.9333M18.6668 11.6667L9.8001 7"-->
        <!--                    stroke="#6F6F6F"-->
        <!--                    class="group-hover:stroke-red transition-200 !duration-[0]"-->
        <!--                    stroke-width="1.75"-->
        <!--                    stroke-linecap="round"-->
        <!--                  />-->
        <!--                </svg>-->
        <!--              </i>-->
        <!--              <i v-else :class="item.icon" class="text-[28px] w-7 h-7"></i>-->
        <!--              <span-->
        <!--                v-if="item.badgeCount"-->
        <!--                class="absolute -top-1 right-[-6px] h-[17px] bg-red rounded-[21px] text-white shadow-[0_2px_12px_rgba(246,37,89,0.3)] text-[13px] flex-center py-0.5 px-[5.5px]"-->
        <!--              >-->
        <!--                {{ item.badgeCount }}-->
        <!--              </span>-->
        <!--            </div>-->
        <!--            <span class="text-xs leading-130 hidden lg:block">-->
        <!--              {{ t(item?.title || '') }}-->
        <!--            </span>-->
        <!--          </div>-->
        <!--          &lt;!&ndash;          <HeaderSearch class="flex-grow z-40" :data="searchResult" />&ndash;&gt;-->
        <!--        </div>-->
      </div>
      <!--      burger open state -->
      <div
        :class="
          showMenu
            ? ' opacity-100 block translate-y-0 rotate-x-0 w-full'
            : 'opacity-0 hidden -translate-y-4 rotate-x-45'
        "
      >
        <div class="!flex items-center space-x-4 !justify-between">
          <CommonSocials :data="socials" />
          <CommonLanguageSwitcher />
        </div>
      </div>
      <!--      burger open state -->
    </div>
    <HeaderSearch
      :class="
        showMenu
          ? ' opacity-0 invisible -translate-y-4 -rotate-x-45 !hidden max-md:!hidden'
          : 'opacity-100 visible translate-y-0 rotate-x-0 !block max-md:!hidden'
      "
      class="flex-grow z-40 container pb-4"
      :data="searchResult"
    />
    <!--  MENU  -->
    <div
      class="transition-300 w-screen h-screen header-menu fixed bg-white flex-grow pt-2 !z-[-1]"
      :class="
        showMenu
          ? 'opacity-100 visible translate-y-0 rotate-x-0'
          : 'opacity-0 invisible -translate-y-4 -rotate-x-45'
      "
    >
      <div
        class="container flex flex-col h-[80dvh] justify-between overflow-y-auto"
      >
        <div>
          <transition name="fade" mode="out-in">
            <CommonButton
              v-if="!user"
              text-class="flex-center"
              :text="t('login')"
              class="!px-5 !py-2.5 mb-5"
              @click="emit('open-auth')"
            >
              <template #pre-icon>
                <i class="icon-login text-2xl mr-1"></i>
              </template>
            </CommonButton>
            <HeaderProfileDropdown v-else @logout="showLogoutModal = true" />
          </transition>

          <div
            class="overflow-y-auto"
            :style="height ? { height: `${height}px` } : ''"
          >
            <div id="catalog" class="flex-col flex">
              <HeaderDropdown
                v-for="(
                  category, parentIdx
                ) in categoriesStore.headerCategories"
                :key="parentIdx"
                @focusout="toggleDropDown(parentIdx, false)"
                @click="toggleDropDown(parentIdx, !dropDownActive[parentIdx])"
              >
                <template #head>
                  <div
                    class="flex justify-between items-center w-full text-left"
                  >
                    <div
                      class="transition-200 leading-[150%] !font-semibold !text-dark !text-base hover:text-red my-3"
                    >
                      {{ category.title }}
                    </div>
                    <span
                      class="icon-chevron-down transition-200 inline-block text-xl ml-1 transform text-dark group-hover:text-red"
                      :class="[
                        dropDownActive[parentIdx]
                          ? '!-rotate-180 !text-red'
                          : '',
                      ]"
                    ></span>
                  </div>
                </template>
                <NuxtLink
                  v-for="(child, idx) in category.categories"
                  :key="idx"
                  :to="
                    localePath({
                      path: '/products',
                      query: { sections: child?.id, keep: true },
                    })
                  "
                  class="transition-200 font-normal text-sm leading-130 text-dark !mb-3 last:mb-0 block hover:text-red hover:translate-x-1"
                  @click="toggleMenu(!true)"
                >
                  {{ child.title }}
                </NuxtLink>
              </HeaderDropdown>
            </div>
          </div>
        </div>
        <ul class="text-semibold grid gap-2 mb-5 mt-2">
          <li>
            <a
              :href="`tel:${commonStore.contacts?.phone}`"
              class="flex items-center group space-x-1"
            >
              <i
                class="icon-incoming-call transition-200 text-gray-300 text-2xl inline-block group-hover:text-red"
              />
              <span
                class="transition-200 text-xs leading-130 text-gray-100 group-hover:text-red"
              >
                {{ formattedPhone }}
              </span>
            </a>
          </li>
          <li>
            <a
              :href="computedAddress"
              target="_blank"
              class="flex items-center group space-x-1"
            >
              <i
                class="icon-map-square transition-200 text-gray-300 text-2xl inline-block group-hover:text-red"
              />
              <span
                class="transition-200 text-xs leading-130 text-gray-100 group-hover:text-red"
              >
                {{ commonStore.contacts?.address }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <CommonModalsLogout
      :show="showLogoutModal"
      @close="showLogoutModal = false"
    />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '~/store/order'
import { useSavedStore } from '~/store/saved'
import { useAuthStore } from '~/store/auth'
import CommonLogo from '~/components/Common/Logo/Logo.vue'
import { useScroll } from '~/composables/useScroll'
import ResponsiveBurger from '~/components/Layout/Header/ResponsiveBurger.vue'
import { useCategoriesStore } from '~/store/categories'
import { useCommonStore } from '~/store/common'
import { formatPhoneNumber } from '~/helpers'
import { searchResult } from '~/data/temp'
import { useStore } from '~/store/index'

const store = useStore()
const openMenu = computed(() => store.openMenu)
const { $event } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const savedStore = useSavedStore()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const height = ref(0)
const showLogoutModal = ref(false)
const dropDownActive = ref(false)
const user = computed(() => authStore.user)

const commonStore = useCommonStore()

const formattedPhone = computed(() => {
  return formatPhoneNumber(commonStore?.contacts?.phone || '')
})

function toggleDropDown(parentIdx, isActive) {
  dropDownActive.value = {
    ...dropDownActive.value,
    [parentIdx]: isActive,
  }
}

const computedAddress = computed(() => {
  return `https://yandex.ru/maps/?ll=${commonStore?.contacts?.latitude},${commonStore?.contacts?.longitude}&z=18`
})

const categoriesStore = useCategoriesStore()
categoriesStore.fetchHeaderCategories()
categoriesStore.fetchHeaderList()

const computedHeaderActions = computed(() => headerActions())

const emit = defineEmits<{
  (e: 'open-auth'): void
}>()
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
const socials = computed(() => [
  {
    name: 'facebook',
    link: commonStore.contacts?.facebook,
    icon: 'icon-facebook-square',
  },
  {
    name: 'instagram',
    link: commonStore.contacts?.instagram,
    icon: 'icon-instagram-square',
  },
  {
    name: 'telegram',
    link: commonStore.contacts?.telegram,
    icon: 'icon-telegram-square',
  },
])
const headerAction = (link: string, lock: boolean) => {
  if (!authStore.user && lock) {
    $event('open-required')
  } else {
    router.push(localePath(link))
  }
}
const showMenu = ref(false)

function toggleMenu(newValue: boolean) {
  newValue ? hideOverflow() : showOverflow()
  showMenu.value = newValue
  store.toggleMenu(newValue)
}

const { hideOverflow, showOverflow } = useScroll()
watch(
  () => locale.value,
  () => {
    categoriesStore.fetchHeaderCategories()
    categoriesStore.fetchHeaderList()
  }
)

watch(
  () => route.path,
  () => {
    showMenu.value = false
  }
)
watch(openMenu, () => {
  showMenu.value = openMenu.value
})
</script>

<style scoped>
ul {
  position: relative !important;
}
.responsive__burger {
  padding: 0 !important;
  margin-right: 20px !important;
}
</style>
