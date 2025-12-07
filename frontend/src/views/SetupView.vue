<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-dark-50 mb-2">Set Your Goal</h1>
        <p class="text-dark-400">Choose your marathon goal and experience level</p>
      </div>

      <!-- Setup Form -->
      <div class="card p-8">
        <form @submit.prevent="handleSetup" class="space-y-8">
          <!-- Goal Selection -->
          <div>
            <label class="block text-lg font-medium text-dark-200 mb-4">
              What's your goal?
            </label>
            <div class="grid grid-cols-2 gap-4">
              <button
                v-for="goal in goals"
                :key="goal.value"
                type="button"
                @click="form.goal = goal.value"
                class="p-6 rounded-lg border-2 transition-all text-left"
                :class="
                  form.goal === goal.value
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-dark-700 hover:border-dark-600'
                "
              >
                <p class="text-2xl font-bold text-dark-50 mb-1">{{ goal.label }}</p>
                <p class="text-sm text-dark-400">{{ goal.distance }}</p>
              </button>
            </div>
          </div>

          <!-- Level Selection -->
          <div>
            <label class="block text-lg font-medium text-dark-200 mb-4">
              What's your experience level?
            </label>
            <div class="space-y-3">
              <button
                v-for="level in levels"
                :key="level.value"
                type="button"
                @click="form.level = level.value"
                class="w-full p-4 rounded-lg border-2 transition-all text-left"
                :class="
                  form.level === level.value
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-dark-700 hover:border-dark-600'
                "
              >
                <p class="font-semibold text-dark-50 mb-1">{{ level.label }}</p>
                <p class="text-sm text-dark-400">{{ level.description }}</p>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!form.goal || !form.level || loading"
            class="btn-primary w-full"
          >
            <span v-if="!loading">Continue to Dashboard</span>
            <span v-else>Setting up...</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '@/api/user'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  goal: '',
  level: '',
})

const goals = [
  { value: 'FIVE_K', label: '5K', distance: '5 kilometers' },
  { value: 'TEN_K', label: '10K', distance: '10 kilometers' },
  { value: 'HALF', label: 'Half Marathon', distance: '21.1 kilometers' },
  { value: 'FULL', label: 'Full Marathon', distance: '42.2 kilometers' },
]

const levels = [
  {
    value: 'BEGINNER',
    label: 'Beginner',
    description: 'New to running or returning after a break',
  },
  {
    value: 'INTERMEDIATE',
    label: 'Intermediate',
    description: 'Regular runner with some race experience',
  },
  {
    value: 'ADVANCED',
    label: 'Advanced',
    description: 'Experienced runner with multiple races completed',
  },
]

const loading = ref(false)
const error = ref<string | null>(null)

const handleSetup = async () => {
  try {
    loading.value = true
    error.value = null
    await userApi.updateProfile(form.value)
    await authStore.refreshUser()
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Failed to update profile'
  } finally {
    loading.value = false
  }
}
</script>

