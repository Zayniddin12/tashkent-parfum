<template>
  <button
    v-bind="{ disabled, type }"
    class="button rounded-lg !py-2 !px-4 md:py-2.5 md:px-3 flex-center cursor-pointer transition-300 relative"
    :style="{ '--spinnerColor': spinnerColor }"
    :class="[{ 'pointer-events-none': loading }, `button-${variant}`]"
  >
    <i
      :class="[
        'transition-300 absolute-center',
        loading ? 'opacity-100 visible' : 'opacity-0 invisible',
      ]"
    >
      <svg class="circular-loader" viewBox="25 25 50 50">
        <circle
          class="circular-loader__path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
        />
      </svg>
    </i>
    <div :class="textStyle">
      <slot name="pre-icon"></slot>
      <slot>
        {{ text }}
      </slot>
      <slot name="post-icon"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { TButtonVariants } from '~/components/Common/Button/types'

interface Props {
  text?: string
  textClass?: string
  spinnerColor?: string
  disabled?: boolean
  loading?: boolean
  type?: string
  variant?: TButtonVariants
}
const props = withDefaults(defineProps<Props>(), {
  text: 'Button',
  textClass: '',
  spinnerColor: 'white',
  disabled: false,
  loading: false,
  variant: 'primary',
})

// ******* EMITS *******

const textStyle = computed(() => {
  const labelClass = props.textClass
  return [
    labelClass,
    !props.loading ? 'opacity-100 visible' : 'opacity-0 invisible',
    'transition delay-100 font-medium letter-3 !leading-sm text-sm select-none flex-y-center gap-x-1',
  ]
})
</script>

<style>
.button:not(:disabled):active {
  transform: scale(0.9);
}

.button:disabled {
  background: #cdcdd0 !important;
  box-shadow: none;
}

.button:not(:disabled):active {
  transform: scale(0.9);
}

.button:disabled {
  cursor: not-allowed;
}
.button:disabled:hover {
  cursor: not-allowed;
  box-shadow: none;
}
.button__shadow {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.button-text {
  @apply font-medium text-sm leading-[17px] tracking-[-0.3px];
}

.button .circular-loader {
  width: 24px;
  height: 24px;
  stroke: var(--spinnerColor);
}

.button .circular-loader__path {
  fill: none;
  stroke-width: 5px;
  stroke-linecap: round;
  animation: animate-stroke 1s ease-in-out infinite;
}

@keyframes animate-stroke {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
/* Variants */

.button-primary {
  background: #f62559;
  color: white;
}
.button-primary:hover {
  background: #fa0738;
  box-shadow: 0px 3px 20px rgba(255, 13, 73, 0.2);
}
.button-secondary {
  background: #eaebed;
  color: #383838;
}
.button-secondary:hover {
  opacity: 0.8;
}
.button-light {
  background: #feebf0;
  color: #f62559;
}
.button-light:hover {
  background: #ffd5df;
}
.button-secondary-light {
  background: #f2f3f5;
  color: #383838;
}
.button-secondary-light:hover {
  background: #eaebed;
}

.button-dark {
  background: #cdcdd0;
  color: #fff;
}

.button-dark:hover {
  background: #c1c1c2;
}
</style>
