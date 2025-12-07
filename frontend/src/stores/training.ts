/**
 * Training Store
 * Manages training sessions state
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trainingApi, type CreateTrainingData, type UpdateTrainingData } from '@/api/training'

export const useTrainingStore = defineStore('training', () => {
  // State
  const trainings = ref<any[]>([])
  const currentTraining = ref<any>(null)
  const trainingPlan = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const fetchTrainings = async (limit?: number) => {
    try {
      loading.value = true
      error.value = null
      trainings.value = await trainingApi.getAll(limit)
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch trainings'
      throw e
    } finally {
      loading.value = false
    }
  }

  const fetchTraining = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      currentTraining.value = await trainingApi.getOne(id)
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch training'
      throw e
    } finally {
      loading.value = false
    }
  }

  const createTraining = async (data: CreateTrainingData) => {
    try {
      loading.value = true
      error.value = null
      const newTraining = await trainingApi.create(data)
      trainings.value.unshift(newTraining)
      return newTraining
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create training'
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateTraining = async (id: string, data: UpdateTrainingData) => {
    try {
      loading.value = true
      error.value = null
      const updated = await trainingApi.update(id, data)
      
      const index = trainings.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        trainings.value[index] = updated
      }
      
      if (currentTraining.value?.id === id) {
        currentTraining.value = updated
      }
      
      return updated
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to update training'
      throw e
    } finally {
      loading.value = false
    }
  }

  const deleteTraining = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      await trainingApi.delete(id)
      trainings.value = trainings.value.filter((t) => t.id !== id)
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to delete training'
      throw e
    } finally {
      loading.value = false
    }
  }

  const generatePlan = async (goal: string, level: string) => {
    try {
      loading.value = true
      error.value = null
      trainingPlan.value = await trainingApi.generatePlan(goal, level)
      return trainingPlan.value
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to generate plan'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    trainings,
    currentTraining,
    trainingPlan,
    loading,
    error,
    fetchTrainings,
    fetchTraining,
    createTraining,
    updateTraining,
    deleteTraining,
    generatePlan,
  }
})

