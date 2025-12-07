<template>
  <div class="card p-6">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-dark-400 text-sm font-medium">{{ title }}</p>
        <p class="text-3xl font-bold text-dark-50 mt-2">{{ value }}</p>
        <p v-if="subtitle" class="text-dark-500 text-sm mt-1">{{ subtitle }}</p>
      </div>
      <div
        class="w-12 h-12 rounded-lg flex items-center justify-center"
        :class="iconBgClass"
      >
        <slot name="icon">
          <svg
            class="w-6 h-6"
            :class="iconClass"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  value: string | number
  subtitle?: string
  color?: 'primary' | 'success' | 'warning' | 'danger'
}>()

const iconBgClass = computed(() => {
  const colors = {
    primary: 'bg-primary-500/10',
    success: 'bg-green-500/10',
    warning: 'bg-yellow-500/10',
    danger: 'bg-red-500/10',
  }
  return colors[props.color || 'primary']
})

const iconClass = computed(() => {
  const colors = {
    primary: 'text-primary-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
  }
  return colors[props.color || 'primary']
})
</script>

