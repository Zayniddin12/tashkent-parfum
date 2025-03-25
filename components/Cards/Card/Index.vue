<template>
  <div
    class="p-2.5 rounded-xl border border-solid border-gray-500 flex-center-between"
  >
    <div class="flex-y-center gap-2">
      <CommonBlockPreloader width="44px" height="44px" :loading="loading">
        <div class="w-11 h-11 rounded-lg bg-[#334055] flex-center">
          <img
              v-if="svgGenerator"
            :src="`/images/cards/${svgGenerator}.svg`"
            class="w-auto h-auto"
            :alt="card?.processing"
          />
        </div>
      </CommonBlockPreloader>
      <CommonBlockPreloader width="160px" height="20.8px" :loading="loading">
        <p class="text-base leading-130 text-dark font-semibold">
          {{ card?.number }}
        </p>
      </CommonBlockPreloader>
    </div>
    <CommonBlockPreloader width="30px" height="30px" :loading="loading">
      <button @click="$emit('delete')">
        <i
          class="icon-trash text-3xl text-gray-200 hover:text-red transition-300"
        />
      </button>
    </CommonBlockPreloader>
  </div>
</template>

<script setup lang="ts">
interface Props {
  card: {
    id: number
    name: string
    processing: string
    number: string
    expiry_date: number
  }
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const svgGenerator = computed(() => {
  return props.card?.processing.toLowerCase()
})
</script>
