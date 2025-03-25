<template>
  <CommonDropdown
    list-style="w-[calc(100%_+_38px)] lg:w-[calc(100%_+_32px)] !z-[50]"
    @on-click="dropDownActive = !dropDownActive"
  >
    <template #head>
      <div class="flex-center group">
        <span
          class="transition-200 text-gray-100 text-xs leading-130 font-roboto font-medium group-hover:text-red"
        >
          {{ activeLang }}
        </span>
        <span
          class="icon-chevron-down transition-200 inline-block text-xl ml-1 transform text-dark group-hover:text-red"
          :class="[dropDownActive ? '!-rotate-180' : '']"
        ></span>
      </div>
    </template>
    <li
      v-for="(item, ind) in languageList"
      :key="item?.value"
      class="transition-200 group flex items-center pl-3 py-4 pr-3.5 text-sm font-semibold !relative cursor-pointer hover:!bg-[#FEF8FA] !z-[99999999999]"
      @click="switchLanguage(item)"
    >
      <div
        class="text-gray-100 group-hover:text-dark flex justify-between w-full"
        :class="{ '!text-red': locale === item.value }"
      >
        <span>{{ item.name }}</span>
        <i
          v-if="locale === item.value"
          class="icon-unread text-red text-xl"
        ></i>
        <span
          v-if="ind !== languageList.length - 1"
          class="absolute w-full left-2 right-0 h-px block bottom-0 bg-[#E5EAEE]"
        />
      </div>
    </li>
  </CommonDropdown>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import CommonDropdown from '../Dropdown/Dropdown.vue'

const { locale, setLocale } = useI18n()
interface ILanguage {
  value: string
  name: string
}

const languageList = ref<ILanguage[]>([
  { value: 'uz', name: 'Ўзбекча' },
  { value: 'sr', name: "O'zbekcha" },
  { value: 'ru', name: 'Русский' },
])

const activeLanguage = ref<ILanguage | undefined>({
  value: 'ru',
  name: 'Русский',
})
const dropDownActive = ref(false)

const switchLanguage = (item: ILanguage) => {
  setLocale(item.value)
}
const activeLang = computed(() => {
  const res = languageList.value.find((el) => el.value === locale.value)?.name
  return res
})
</script>
