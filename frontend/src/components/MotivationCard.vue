<template>
  <div class="card p-6 fade-in">
    <div class="flex items-start space-x-4">
      <!-- Icon -->
      <div
        class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
        :class="iconBgClass"
      >
        <svg
          class="w-6 h-6"
          :class="iconClass"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="trigger === 'COMPLETED'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            v-else-if="trigger === 'MILESTONE'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="text-xs font-medium uppercase tracking-wider" :class="triggerClass">
              {{ triggerLabel }}
            </p>
            <p class="text-dark-100 mt-2 leading-relaxed">{{ message }}</p>
          </div>
          <p v-if="createdAt" class="text-xs text-dark-500 ml-4">{{ timeAgo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDistanceToNow } from 'date-fns'

const props = defineProps<{
  trigger: 'COMPLETED' | 'MISSED' | 'MILESTONE' | 'REMINDER'
  message: string
  createdAt?: string
}>()

const triggerLabel = computed(() => {
  const labels = {
    COMPLETED: 'Training Completed',
    MISSED: 'Missed Workout',
    MILESTONE: 'Milestone Reached',
    REMINDER: 'Reminder',
  }
  return labels[props.trigger]
})

const triggerClass = computed(() => {
  const classes = {
    COMPLETED: 'text-green-500',
    MISSED: 'text-yellow-500',
    MILESTONE: 'text-primary-500',
    REMINDER: 'text-blue-500',
  }
  return classes[props.trigger]
})

const iconBgClass = computed(() => {
  const classes = {
    COMPLETED: 'bg-green-500/10',
    MISSED: 'bg-yellow-500/10',
    MILESTONE: 'bg-primary-500/10',
    REMINDER: 'bg-blue-500/10',
  }
  return classes[props.trigger]
})

const iconClass = computed(() => {
  const classes = {
    COMPLETED: 'text-green-500',
    MISSED: 'text-yellow-500',
    MILESTONE: 'text-primary-500',
    REMINDER: 'text-blue-500',
  }
  return classes[props.trigger]
})

const timeAgo = computed(() => {
  if (!props.createdAt) return ''
  return formatDistanceToNow(new Date(props.createdAt), { addSuffix: true })
})
</script>

