/**
 * Auth Store
 * Manages authentication state
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi, type RegisterData, type LoginData } from '@/api/auth'
import { userApi } from '@/api/user'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(null)
  const user = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Actions
  const initAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  const register = async (data: RegisterData) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await authApi.register(data)
      
      token.value = response.accessToken
      user.value = response.user
      
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Registration failed'
      throw e
    } finally {
      loading.value = false
    }
  }

  const login = async (data: LoginData) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await authApi.login(data)
      
      token.value = response.accessToken
      user.value = response.user
      
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Login failed'
      throw e
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const refreshUser = async () => {
    try {
      const profile = await userApi.getProfile()
      user.value = profile
      localStorage.setItem('user', JSON.stringify(profile))
    } catch (e) {
      console.error('Failed to refresh user:', e)
    }
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    initAuth,
    register,
    login,
    logout,
    refreshUser,
  }
})

