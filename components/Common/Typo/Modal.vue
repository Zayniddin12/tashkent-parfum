<template>
  <CommonModalsModal @close="$emit('close')" inside :show="show">
    <div class="p-5">
      <p class="text-xl font-bold leading-6 text-dark">
        {{ $t('report_bug') }}
      </p>
    </div>

    <div class="p-5 pt-0">
      <FormGroup :label="$t('full')">
        <FormTextarea
          no-resize
          :placeholder="$t('report_bug_text')"
          maxlength="500"
          v-model="form.values.message"
          :error="form.$v.value.message.$error"
        />
      </FormGroup>

      <FormGroup class="mt-4" :label="$t('upload_photo')">
        <FormUploadPhoto
          :desc="$t('upload_photo_text')"
          @upload="form.values.images = $event"
        />
      </FormGroup>

      <CommonButton
        :text="$t('send')"
        class="w-full mt-5"
        @click="submit"
        :loading="loading"
      />
    </div>
  </CommonModalsModal>
</template>

<script setup lang="ts">
import type { TForm } from '~/composables/useForm'

interface Props {
  show?: boolean
  form: TForm<any>
  loading?: boolean
}

const emit = defineEmits(['submit'])

const props = withDefaults(defineProps<Props>(), {})

const { form } = unref(props)
const { values, $v } = form

const submit = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    emit('submit')
  }
}
</script>

<style scoped></style>
