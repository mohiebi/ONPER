/**
 * Motivation Store
 * Manages motivational messages state
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { motivationApi } from '@/api/motivation'

export const useMotivationStore = defineStore('motivation', () => {
  // State
  const history = ref<any[]>([])
  const latestMessage = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const fetchHistory = async (limit?: number) => {
    try {
      loading.value = true
      error.value = null
      history.value = await motivationApi.getHistory(limit)
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch motivation history'
      throw e
    } finally {
      loading.value = false
    }
  }

  const fetchLatest = async () => {
    try {
      loading.value = true
      error.value = null
      latestMessage.value = await motivationApi.getLatest()
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch latest motivation'
      throw e
    } finally {
      loading.value = false
    }
  }

  const checkMilestones = async () => {
    try {
      loading.value = true
      error.value = null
      const result = await motivationApi.checkMilestones()
      if (result) {
        await fetchHistory()
      }
      return result
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to check milestones'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    history,
    latestMessage,
    loading,
    error,
    fetchHistory,
    fetchLatest,
    checkMilestones,
  }
})

