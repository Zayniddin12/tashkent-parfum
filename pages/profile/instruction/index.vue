<template>
  <Transition name="fade" mode="out-in">
    <CardsBlank :key="loading" class="!p-5">
      <transition name="fade" mode="out-in">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <template v-if="loading">
            <CardsInstructionLoader v-for="i in 6" :key="i" loading />
          </template>
          <template v-else>
            <CardsInstruction
              v-for="(item, index) in data"
              :key="index"
              :card="item"
            />
          </template>
        </div>
      </transition>
    </CardsBlank>
  </Transition>
</template>

<script setup lang="ts">
import { useFetcher } from '~/composables/fetcher'

const data = ref()

const loading = ref(true)

onMounted(() => {
  useFetcher('settings/instructions/')
    .then((res: any) => {
      data.value = res?.data?.results
    })
    .finally(() => {
      loading.value = false
    })
})
</script>
