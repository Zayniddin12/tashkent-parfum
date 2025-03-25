<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <h2 class="text-dark text-2xl font-bold mb-12">
        {{ $t('register_main') }}
      </h2>
      <div>
        <h3 class="text-xl text-dark font-bold mb-4">
          {{ $t('enter_your_data') }}
        </h3>
        <form submit="onSubmit" autocomplete="off">
          <div class="mb-4">
            <FormLabel :label="$t('fio')" for-text="fio" />
            <FormInput
              v-model="form.values.stepOne.full_name"
              auto-focus
              id="fio"
              class="mt-2"
              :placeholder="$t('enter_your_full_name')"
              :error="form.$v.value.stepOne.full_name?.$error || error"
              input-class="placeholder:text-gray-100"
              :autocomplete="false"
              @enter="login"
            />
          </div>
          <div class="mb-4">
            <FormLabel :label="$t('phone_number')" for-text="phone_number" />
            <FormInput
              v-model="form.values.stepOne.phone"
              v-maska="`(##) ###-##-##`"
              id="phone_number"
              class="mt-2"
              placeholder="(__) ___-__-__"
              :error="form.$v.value.stepOne.phone?.$error || error"
              input-class="placeholder:text-gray-100"
              prefix-class="text-dark text-base px-3 py-2.5 bg-gray-400"
              :autocomplete="false"
              @enter="login"
            >
              <template #prefix> +998 </template>
            </FormInput>
          </div>
        </form>
      </div>
    </div>
    <div>
      <CommonButton
        :text="$t('register')"
        class="w-full"
        @click="login"
        :loading="loading"
      />
      <div class="auth-or w-full flex-center my-3">
        <span class="mx-3 text-xs text-gray-200 flex-shrink-0">{{
          $t('have_account')
        }}</span>
      </div>
      <CommonButton
        :text="$t('login')"
        class="w-full"
        @click="emit('login')"
        variant="secondary"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type  {TForm} from '~/composables/useForm'
import { isPhone } from "~/helpers";
import * as pkg from 'vue-toastification'

interface Props {
  loading?: boolean
  phoneError?: boolean
  formData: TForm<any>
}
const props = defineProps<Props>()

const form = unref(props.formData)
const { values, $v } = form
const emit = defineEmits<{
  (e: 'on-submit', value: object): void
  (e: 'login'): void
}>()

const { useToast } = pkg
const { t } = useI18n()
const toast = useToast()

const error = ref(false)
watch(() => props.phoneError, (val) => {
  error.value = val
}, {
  immediate: true
})
watch(() => form.values, (val) => {
  if (error.value) {
    error.value = false
  }
}, {
  deep: true,
  immediate: true
})
function login() {
  form.$v.value.stepOne.$touch()
  if (!form.$v.value.stepOne.$invalid) {
    emit('on-submit', form.values.stepOne)
  } else {
    if(!isPhone(form.values.stepOne.phone)) {
      toast.error(t('phone_error'))
    }
    else {
      toast.error(t('fill_in_form'))
    }
  }
}
</script>
<style>
.auth-or::before,
.auth-or::after {
  content: '';
  width: 100%;
  height: 2px;
  background: #cdcdd0;
  opacity: 0.7;
  border-radius: 1px;
  display: block;
}
</style>
