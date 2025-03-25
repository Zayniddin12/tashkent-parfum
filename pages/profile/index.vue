<template>
  <div>
    <CardsBlank class="p-5 pr-0">
      <div
        class="pr-5 pb-3 border-b border-solid border-gray-600 flex-center-between"
      >
        <CommonBlockPreloader height="31.2px" width="150px" :loading="loading">
          <p class="text-2xl leading-130 font-bold text-dark">
            {{ $t('personal_detail') }}
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader width="88px" height="40px" :loading="loading">
          <CommonButton
            :variant="'light'"
            :text="$t('log_out')"
            text-class="flex-y-center"
            @click="showLogoutModal = true"
          >
            <template #post-icon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 15.3334C7.05448 15.3334 4.66667 12.9455 4.66667 10C4.66667 7.0545 7.05448 4.66669 10 4.66669"
                  stroke="#F62559"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M8.66732 10H15.334M15.334 10L13.334 8M15.334 10L13.334 12"
                  stroke="#F62559"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </template>
          </CommonButton>
        </CommonBlockPreloader>
      </div>

      <CommonAvatar
        :image="user?.avatar_src?.default"
        class="my-5 bg-red"
        :loading="loading"
      />
      <div
        class="border border-solid border-gray-400 rounded-lg md:flex items-stretch justify-between mr-5"
      >
        <div class="w-full h-auto p-4 md:border-r border-solid border-gre-400">
          <CommonBlockPreloader
            width="70px"
            height="20.8px"
            :loading="loading"
            preloader-class="mb-1"
          >
            <p class="text-gray-200 text-base leading-130 font-semibold mb-1">
              {{ $t('name') }}:
            </p>
          </CommonBlockPreloader>
          <CommonBlockPreloader
            width="120px"
            height="20.8px"
            :loading="loading"
          >
            <p class="text-dark leading-130 font-semibold text-base">
              {{ user?.full_name }}
            </p>
          </CommonBlockPreloader>
        </div>
        <!--      <div class="w-full h-auto p-4 border-r border-solid border-gray-400">-->
        <!--        <CommonBlockPreloader-->
        <!--          width="70px"-->
        <!--          height="20.8px"-->
        <!--          :loading="loading"-->
        <!--          preloader-class="mb-1"-->
        <!--        >-->
        <!--          <p class="text-gray-200 text-base leading-130 font-semibold mb-1">-->
        <!--            {{ $t('surname') }}:-->
        <!--          </p>-->
        <!--        </CommonBlockPreloader>-->
        <!--        <CommonBlockPreloader width="120px" height="20.8px" :loading="loading">-->
        <!--          <p class="text-dark leading-130 font-semibold text-base">-->
        <!--            Домлахонов-->
        <!--          </p>-->
        <!--        </CommonBlockPreloader>-->
        <!--      </div>-->
        <div class="w-full h-auto p-4">
          <CommonBlockPreloader
            width="70px"
            height="20.8px"
            :loading="loading"
            preloader-class="mb-1"
          >
            <p class="text-gray-200 text-base leading-130 font-semibold mb-1">
              {{ $t('address') }}:
            </p>
          </CommonBlockPreloader>
          <CommonBlockPreloader
            width="120px"
            height="20.8px"
            :loading="loading"
          >
            <p
              v-if="user?.address || user?.district?.title"
              class="text-dark leading-130 font-semibold text-base"
            >
              {{user?.district?.title}}
              {{ user?.address }}
            </p>
            <p v-else>-</p>
          </CommonBlockPreloader>
        </div>
      </div>
      <div class="flex items-end justify-end pr-5 mt-4">
        <CommonBlockPreloader height="43.5px" width="110px" :loading="loading">
          <nuxt-link :to="localePath('/profile/edit')">
            <CommonButton
              :text="$t('edit')"
              text-class="flex-y-center gap-1"
              class="px-6"
            >
              <template #pre-icon>
                <div class="-mb-1">
                  <i class="icon-edit-square text-2xl" />
                </div>
              </template>
            </CommonButton>
          </nuxt-link>
        </CommonBlockPreloader>
      </div>
    </CardsBlank>
    <CommonModalsLogout
      :show="showLogoutModal"
      @close="showLogoutModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/store/auth'

const { t: $t } = useI18n()
const authStore = useAuthStore()

const loading = ref(false)
const showLogoutModal = ref(false)
const localePath = useLocalePath()
const user = computed(() => authStore.user)

useHead({
  title: $t('profile'),
})
</script>
