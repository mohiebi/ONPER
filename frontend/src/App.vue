<template>
  <div id="app" class="min-h-screen bg-dark-900">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize auth on app load
  authStore.initAuth()
})
</script>

