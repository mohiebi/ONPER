<template>
  <div class="page-container">
    <Navbar />
    
    <div class="page-content">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-dark-50 mb-2">Motivation Feed</h1>
        <p class="text-dark-400">
          Your journey to the 1% — every message, every milestone
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-400 text-sm">Total Messages</p>
              <p class="text-3xl font-bold text-dark-50 mt-2">{{ history.length }}</p>
            </div>
            <div class="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-400 text-sm">Completed Workouts</p>
              <p class="text-3xl font-bold text-dark-50 mt-2">{{ completedCount }}</p>
            </div>
            <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-400 text-sm">Milestones</p>
              <p class="text-3xl font-bold text-dark-50 mt-2">{{ milestoneCount }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <LoadingSpinner />
      </div>

      <!-- Empty State -->
      <div v-else-if="history.length === 0" class="card p-12 text-center">
        <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-dark-50 mb-2">No messages yet</h3>
        <p class="text-dark-400 mb-6">
          Complete your first workout to receive motivational messages
        </p>
        <router-link to="/dashboard" class="btn-primary">
          Go to Dashboard
        </router-link>
      </div>

      <!-- Motivation Feed -->
      <div v-else class="space-y-4">
        <MotivationCard
          v-for="message in history"
          :key="message.id"
          :trigger="message.trigger"
          :message="message.message"
          :created-at="message.createdAt"
        />
      </div>

      <!-- Inspirational Quote -->
      <div class="mt-12 card p-8 text-center bg-gradient-to-br from-primary-500/10 to-primary-700/10 border-primary-500/20">
        <svg class="w-12 h-12 text-primary-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <blockquote class="text-xl font-medium text-dark-50 mb-2">
          "The only person you are destined to become is the person you decide to be."
        </blockquote>
        <p class="text-dark-400">— Ralph Waldo Emerson</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMotivationStore } from '@/stores/motivation'
import Navbar from '@/components/Navbar.vue'
import MotivationCard from '@/components/MotivationCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const motivationStore = useMotivationStore()

const history = computed(() => motivationStore.history)
const loading = computed(() => motivationStore.loading)

const completedCount = computed(() => {
  return history.value.filter((m) => m.trigger === 'COMPLETED').length
})

const milestoneCount = computed(() => {
  return history.value.filter((m) => m.trigger === 'MILESTONE').length
})

onMounted(() => {
  motivationStore.fetchHistory()
})
</script>

