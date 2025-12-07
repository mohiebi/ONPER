<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div
      class="animate-spin rounded-full border-t-2 border-b-2"
      :class="spinnerClass"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    color?: 'primary' | 'white'
  }>(),
  {
    size: 'md',
    color: 'primary',
  }
)

const containerClass = computed(() => {
  const sizes = {
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-24',
  }
  return sizes[props.size]
})

const spinnerClass = computed(() => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }
  const colors = {
    primary: 'border-primary-500',
    white: 'border-white',
  }
  return `${sizes[props.size]} ${colors[props.color]}`
})
</script>

