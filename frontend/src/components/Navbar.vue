<template>
  <nav class="bg-dark-800 border-b border-dark-700">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/dashboard" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">1%</span>
          </div>
          <span class="text-xl font-bold gradient-text">ONPER</span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/dashboard"
            class="text-dark-300 hover:text-primary-400 transition-colors"
          >
            Dashboard
          </router-link>
          <router-link
            to="/motivation"
            class="text-dark-300 hover:text-primary-400 transition-colors"
          >
            Motivation
          </router-link>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-dark-100">{{ user?.name }}</p>
            <p class="text-xs text-dark-400">{{ goalLabel }}</p>
          </div>
          <button
            @click="handleLogout"
            class="text-dark-400 hover:text-dark-200 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const goalLabel = computed(() => {
  const goalMap: any = {
    FIVE_K: '5K Runner',
    TEN_K: '10K Runner',
    HALF: 'Half Marathon',
    FULL: 'Full Marathon',
  }
  return goalMap[user.value?.goal] || 'Runner'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

