<template>
  <div class="w-full">
    <CommonBlockPreloader height="28px" width="140px" :loading="loading">
      <p
        class="text-dark font-bold leading-130 text-xl group-hover:text-red transition-300"
      >
        #{{ id }}
      </p>
    </CommonBlockPreloader>

    <p
      class="mt-2 text-gray-200 font-semibold leading-130 text-sm"
      :class="loading ? 'opacity-0' : 'opacity-1'"
    >
      {{ $t('total') }}: <span class="text-dark">{{ subtitle }}</span>
    </p>

    <CommonBlockPreloader height="38px" width="260px" :loading="loading">
      <p
        class="mt-2 text-gray-200 font-semibold leading-130 text-xs md:text-sm"
      >
        {{ $t('address') }}:
        <span class="text-dark !w-full"> {{ address }}</span>
      </p>
    </CommonBlockPreloader>
    <div :class="loading ? 'my-[10px]' : ''"></div>
    <OrderStatusBadge v-bind="{ loading, status }" custom="mt-2" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  status: number | string
  id: number
  subtitle: string
  address?: string
  loading?: boolean
}

const props = defineProps<Props>()
const localePath = useLocalePath()
</script>
