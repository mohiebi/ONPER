<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl mb-4">
          <span class="text-white font-bold text-2xl">1%</span>
        </router-link>
        <h1 class="text-3xl font-bold text-dark-50 mb-2">Start Your Journey</h1>
        <p class="text-dark-400">Create your account and join the 1%</p>
      </div>

      <!-- Register Form -->
      <div class="card p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-dark-200 mb-2">
              Full Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="input"
              placeholder="John Doe"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-dark-200 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input"
              placeholder="john@example.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-dark-200 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="input"
              placeholder="••••••••"
            />
            <p class="text-xs text-dark-500 mt-1">Minimum 6 characters</p>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full"
          >
            <span v-if="!loading">Create Account</span>
            <span v-else>Creating account...</span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-dark-400 text-sm">
            Already have an account?
            <router-link to="/login" class="text-primary-500 hover:text-primary-400 font-medium">
              Sign in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref<string | null>(null)

const handleRegister = async () => {
  try {
    loading.value = true
    error.value = null
    await authStore.register(form.value)
    router.push('/setup')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

