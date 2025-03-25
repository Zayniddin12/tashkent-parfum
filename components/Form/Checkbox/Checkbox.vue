<template>
  <label
    class="group w-full flex items-center relative select-none min-h-[20px] pb-2 mb-2"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <input
      v-bind="{ disabled }"
      type="checkbox"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      :checked="modelValue"
      :value="value"
      :name="name"
      @change="handleChange"
    />
    <Transition name="bounceIn" mode="out-in" duration="200">
      <span
        v-if="!parent"
        :class="[
          'icon-unread peer-checked:opacity-100 peer-checked:rotate-[0] peer-disabled:text-gray-300 text-2xl font-black text-white transition-all duration-200 absolute left-[-2px] top-[-0.5px] rotate-[138deg] z-10 opacity-0',
        ]"
      />
      <span
        v-else
        :class="[
          'peer-checked:opacity-100 peer-checked:rotate-[0] rounded-3xl w-[14px] h-0.5 bg-white transition-all duration-200 absolute left-[3px] top-[11px] rotate-[138deg] z-10 opacity-0',
        ]"
      />
    </Transition>
    <span
      :class="[
        'duration-200 ease-in-out absolute top-0.5 left-0 inline-block h-5 w-5 rounded border-2 peer-checked:-rotate-90',
        'border-gray-300 peer-checked:border-dark_red peer-checked:bg-dark_red peer-disabled:border-gray-300',
        {
          '!border-danger': error,
          'group-hover:border-gray-300': !disabled,
        },
      ]"
    />
    <span class="w-full pl-8">
      <slot name="label">
        <span
          :class="[
            'font-semibold letter-3 leading-130 text-[#2B3646] text-sm transition-300 group-hover:text-dark_red',
            labelStyles,
          ]"
        >
          {{ label }}
        </span>
      </slot>
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: any
  label?: string
  name?: string
  value?: any
  disabled?: boolean
  error?: boolean
  labelStyles?: string
  parent?: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const route = useRoute()
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'route'): void
}>()
const handleChange = (e: any) => {
  e.preventDefault()
  emit('update:modelValue', props.value ? e.target.value : e.target.checked)
  emit('route')
}
</script>
