<template>
  <label for="toggle_button" class="flex items-center justify-between">
    <span :class="labelClass"> {{ label }} </span>
    <div
      class="relative w-11 h-[24px] rounded-[20px] cursor-pointer duration-200 ease-in-out"
      :class="modelValue ? 'bg-red' : 'bg-gray-50'"
    >
      <input
        id="toggle_button"
        type="checkbox"
        class="absolute w-px h-px opacity-0"
        :checked="modelValue"
        :value="value"
        :name="name"
        @change="handleChange"
      />
      <span
        class="absolute w-5 h-5 rounded-full top-0.5 bg-white left-0.5 duration-200 ease-in-out shadow-toggle"
        :class="!modelValue ? 'translate-x-0' : 'translate-x-5'"
      />
    </div>
  </label>
</template>
<script setup lang="ts">
interface Props {
  modelValue: boolean
  label: string
  name: string
  value: any
  labelClass?: string
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()
const handleChange = (e: any) => {
  emit('update:modelValue', props.value ? e.target.value : e.target.checked)
}
</script>

<style></style>
