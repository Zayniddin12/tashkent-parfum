<template>
  <CommonModalsModal
    @close="$emit('close')"
    :show="show"
    title=""
    body-wrapper-class="!max-w-[580px] p-5"
  >
    <template #header>
      <h5 class="text-xl font-bold text-dark">
        {{ $t('rate_product') }}
      </h5>
    </template>
    <form @submit.prevent="sendReview">
      <div class="mt-8">
        <div class="w-max max-w-full mx-auto">
          <p class="text-center mb-3 text-dark text-base font-semibold">
            {{ $t('rate_your_review') }}
          </p>
          <CommonRatePicker v-model="form.values.rate" />
        </div>
        <div class="mt-5">
          <div class="flex-y-center justify-between">
            <FormLabel for-text="comment_field" :label="$t('your_review')" />
            <p v-if="form.$v.value.comment.$error" class="text-sm text-red">{{ $t('minimum_4_characters') }}</p>
          </div>
          <FormTextarea
            v-model="form.values.comment"
            :error="form.$v.value.comment.$error"
            id="comment_field"
            input-class="h-[158px] text-base text-dark font-normal font-proxima"
            no-resize
            class="mt-2 bg-gray-500"
            :placeholder="$t('enter_your_review')"
          />
        </div>
        <div class="flex justify-end mt-4">
          <CommonButton class="!px-5 !py-2.5" :text="$t('send')" :loading="loading" />
        </div>
      </div>
    </form>
  </CommonModalsModal>
</template>

<script setup lang="ts">
// Modal config
import  type { TReviewPayloadData } from '~/types/feedback'
import * as pkg from 'vue-toastification'
import { useForm } from '~/composables/useForm'
import {minLength, required} from "@vuelidate/validators";

const { useToast } = pkg

interface Props {
  show: boolean
  successMessage?: string
  loading?: boolean
  error?: boolean
}
const props = defineProps<Props>()

interface Emits {
  (e: 'send', val: TReviewPayloadData): void
  (e: 'error', val: string): void
  (e: 'close'): void
}
const $emit = defineEmits<Emits>()

const $toast = useToast()
const { t: $t } = useI18n()
const showModal = ref(false)
const form = useForm({
  rate: 0,
  comment: ''
},
    {comment: {minLength: minLength(4), required}}
)
// const form = reactive<TReviewPayloadData>({
//   rate: 0,
//   comment: '',
// })

const fieldError = ref(false)

const sendReview = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid){
    if (form.values.rate < 1) {
      $emit('error', 'rate_is_required')
      return $toast.error($t('rate_is_required'))
    }
    fieldError.value = false
    // $emit('close')
    $emit('send', form.values)
  }
}


watch(() => props.show, () => {
  form.values.comment = ''
  form.values.rate = 0
  form.$v.value.$reset()
})
</script>
