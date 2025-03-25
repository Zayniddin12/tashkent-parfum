<template>
  <div class="flex space-x-4">
    <input
      v-for="index in digits"
      :key="index"
      type="number"
      maxlength="1"
      :class="[context.classes?.digit, { '!border-red': error }]"
      :value="tmp[index - 1] || ''"
      @input="handleInput(index - 1, $event)"
      @focus="handleFocus"
      @paste="handlePaste"
      :data="`otp-data-id-${index}-${uuid}`"
      @keyup.delete="test(tmp, index - 1, $event)"
      class="text-center"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { generateUniqueId } from '~/helpers'
interface Props {
  context?: object
  error: boolean
}
const props = withDefaults(defineProps<Props>(), {
  context: {
    digits: 6,
    node: {
      input(i: number) {
        return i
      },
    },
    classes: {
      digit:
        'w-11 h-11 rounded-xl py-2.5 px-4 border border-dark !ml-1.5 md:ml-4',
    },
  },
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'submit'): void
}>()
const digits = Number(props.context?.digits)
const tmp = ref(props.context?.value || '')

const uuid = generateUniqueId()

/**
 * Handle input, advancing or retreating focus.
 */
function handleInput(index, e) {
  const prev = tmp.value
  if (tmp.value.length <= index) {
    // If this is a new digit
    tmp.value = '' + tmp.value + e.target.value
  } else {
    // If this digit is in the middle somewhere, cut the string into two
    // pieces at the index, and insert our new digit in.
    tmp.value =
      '' +
      tmp.value.substr(0, index) +
      e.target.value +
      tmp.value.substr(index + 1)
  }

  // Get all the digit inputs
  const inputs = e.target.parentElement.querySelectorAll('input')
  if (index < digits - 1 && tmp.value.length >= prev.length) {
    // If this is a new input and not at the end, focus the next input
    inputs.item(index + 1).focus()
  } else if (index > 0 && tmp.value.length < prev.length) {
    // in this case we deleted a value, focus backwards
    inputs.item(index - 1).focus()
  }

  // if (tmp.value.length === digits) {
  //   // If our input is complete, commit the value.
  //   props.context?.node.input(tmp.value)
  //
  // } else if (tmp.value.length < digits && props.context?.value !== '') {
  //   // If our input is incomplete, it should have no value.
  //   props.context?.node.input('')
  // }

  if (tmp.value.length === props.context.digits) {
    emit('submit')
  }
  emit('update:modelValue', tmp.value)
}

onMounted(() => {
  const otpInput = document.querySelector(
    `[data='otp-data-id-1-${uuid}']`
  ) as HTMLInputElement
  otpInput?.focus()
})

function test(tmp, index, e) {
  const inputs = e.target.parentElement.querySelectorAll('input')

  if (!e.target.value.length) {
    inputs.item(index - 1)?.focus()
  } else {
    inputs.item(index)?.focus()
  }
}

/**
 * On focus, select the text in our input.
 */
function handleFocus(e) {
  e.target.select()
}

/**
 * Handle the paste event.
 */
function handlePaste(e) {
  const paste = e.clipboardData.getData('text')
  if (typeof paste === 'string') {
    // If it is the right length, paste it.
    tmp.value = paste.substr(0, digits)
    const inputs = e.target.parentElement.querySelectorAll('input')
    // Focus on the last character
    inputs.item(tmp.value.length - 1).focus()
  }
}
</script>
