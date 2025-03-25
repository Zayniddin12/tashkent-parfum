<template>
  <div class="html mt-8" v-html="data"></div>
</template>

<script setup lang="ts">
interface Props {
  data: string
}
defineProps<Props>()
</script>
