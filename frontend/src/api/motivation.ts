/**
 * Motivation API
 */

import apiClient from './client'

export const motivationApi = {
  getHistory: async (limit?: number) => {
    const params = limit ? { limit } : {}
    const response = await apiClient.get('/motivation/history', { params })
    return response.data
  },

  getLatest: async () => {
    const response = await apiClient.get('/motivation/latest')
    return response.data
  },

  checkMilestones: async () => {
    const response = await apiClient.post('/motivation/check-milestones')
    return response.data
  },

  sendDailyReminder: async () => {
    const response = await apiClient.post('/motivation/daily-reminder')
    return response.data
  },
}

