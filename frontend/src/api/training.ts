/**
 * Training API
 */

import apiClient from './client'

export interface CreateTrainingData {
  date: string
  distance: number
  duration: number
  mood?: string
  completed?: boolean
  notes?: string
}

export interface UpdateTrainingData extends Partial<CreateTrainingData> {}

export const trainingApi = {
  getAll: async (limit?: number) => {
    const params = limit ? { limit } : {}
    const response = await apiClient.get('/training', { params })
    return response.data
  },

  getOne: async (id: string) => {
    const response = await apiClient.get(`/training/${id}`)
    return response.data
  },

  create: async (data: CreateTrainingData) => {
    const response = await apiClient.post('/training', data)
    return response.data
  },

  update: async (id: string, data: UpdateTrainingData) => {
    const response = await apiClient.patch(`/training/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/training/${id}`)
    return response.data
  },

  generatePlan: async (goal: string, level: string) => {
    const response = await apiClient.get('/training/plan', {
      params: { goal, level },
    })
    return response.data
  },
}

