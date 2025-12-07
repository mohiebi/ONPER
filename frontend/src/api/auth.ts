/**
 * Authentication API
 */

import apiClient from './client'

export interface RegisterData {
  email: string
  name: string
  password: string
  goal?: string
  level?: string
}

export interface LoginData {
  email: string
  password: string
}

export const authApi = {
  register: async (data: RegisterData) => {
    const response = await apiClient.post('/auth/register', data)
    return response.data
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post('/auth/login', data)
    return response.data
  },
}

