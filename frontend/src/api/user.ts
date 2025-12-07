/**
 * User API
 */

import apiClient from './client'

export interface UpdateProfileData {
  name?: string
  goal?: string
  level?: string
}

export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get('/users/profile')
    return response.data
  },

  updateProfile: async (data: UpdateProfileData) => {
    const response = await apiClient.patch('/users/profile', data)
    return response.data
  },
}

