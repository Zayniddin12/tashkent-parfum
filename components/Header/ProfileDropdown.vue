<template>
  <CommonDropdown list-style="min-w-[160px] !top-16" button-class="!p-0">
    <template #head>
      <div
        class="flex-y-center group transition-200 group bg-gray-500 hover:opacity-80 p-1 pr-3 rounded-md"
      >
        <div class="flex-y-center space-x-1.5">
          <CommonAvatar
            class="!w-9 !h-9"
            :image="
              user.avatar_src.small || '/images/defaults/profile-user.png'
            "
          />
          <p
            class="text-xs !text-left font-semibold leading-[200%] text-dark max-w-[100px] line-clamp-1"
          >
            {{ user.full_name }}
          </p>
        </div>
      </div>
    </template>
    <li
      v-for="(item, idx) in profileActions"
      :key="item?.value"
      class="transition-200 flex items-center pl-3 py-4 pr-3.5 text-sm font-semibold relative cursor-pointer hover:bg-gray-500"
      @click="onSelectProfile(item)"
    >
      <div class="text-gray-100 flex-y-center space-x-2">
        <i
          :class="[
            item.icon,
            checkAction('log-out', idx) ? 'text-red' : 'text-gray-200',
          ]"
          class="text-xl flex-shrink-0"
        ></i>
        <span
          class="font-semibold text-xs leading-130"
          :class="checkAction('log-out', idx) ? 'text-red' : 'text-dark'"
        >
          {{ t(item.title) }}
        </span>
        <span
          v-if="idx !== profileActions.length - 1"
          class="absolute w-full left-2 right-0 h-px block bottom-0 bg-[#E5EAEE]"
        />
      </div>
    </li>
  </CommonDropdown>
</template>
<script lang="ts" setup>
import { profileActions } from '~/data/header'
import type { IProfileAction } from '~/types/header'
import { useAuthStore } from '~/store/auth'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const localePath = useLocalePath()
const user = computed(() => authStore.user)

const emit = defineEmits<{
  (e: 'logout'): void
}>()

function onSelectProfile(action: IProfileAction) {
  if (action.name === 'log-out') {
    emit('logout')
  } else {
    router.push(localePath(action.link))
  }
}

function checkAction(name: string, idx: number) {
  return profileActions[idx].name === name
}
</script>
