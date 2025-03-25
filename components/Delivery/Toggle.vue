<template>
  <div class="toggle__wrapper">
    <button
      v-for="(item, index) in data"
      :key="index"
      :class="{ active: modelValue === item.id }"
      @click="emit('update:modelValue', item.id)"
    >
      {{ item.title }}
    </button>
  </div>
</template>
<script setup lang="ts">
type TProps = {
  id: string
  title: string
}
interface Props {
  modelValue?: string
  data?: TProps[]
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style scoped>
.toggle__wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  background: #f2f3f5;
  border-radius: 12px;
}

.toggle__wrapper button {
  transition: 0.3s ease all;
  padding: 8px 13px;
  border-radius: 6px;
  border: none;
  background-color: transparent;
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  color: #6f6f6f;
}

.toggle__wrapper .active {
  background: #ffffff;
  box-shadow: 0px 1px 12px rgba(5, 5, 5, 0.3);
  color: #383838;
}

.toggle__wrapper button:first-child.active {
  border-radius: 10px 4px 4px 10px;
}

.toggle__wrapper button:last-child.active {
  border-radius: 4px 10px 10px 4px;
}
</style>
