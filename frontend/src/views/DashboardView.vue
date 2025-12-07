<template>
  <div class="page-container">
    <Navbar />
    
    <div class="page-content">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-dark-50 mb-2">
          Welcome back, {{ user?.name }}! 👋
        </h1>
        <p class="text-dark-400">
          Keep pushing towards your {{ goalLabel }} goal
        </p>
      </div>

      <!-- Latest Motivation -->
      <div v-if="latestMotivation" class="mb-8">
        <MotivationCard
          :trigger="latestMotivation.trigger"
          :message="latestMotivation.message"
          :created-at="latestMotivation.createdAt"
        />
      </div>

      <!-- Stats Grid -->
      <div v-if="profile" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Runs"
          :value="profile.stats.totalRuns"
          color="primary"
        >
          <template #icon>
            <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </template>
        </StatCard>

        <StatCard
          title="Total Distance"
          :value="`${profile.stats.totalDistance} km`"
          color="success"
        >
          <template #icon>
            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </template>
        </StatCard>

        <StatCard
          title="Total Time"
          :value="formatDuration(profile.stats.totalDuration)"
          color="warning"
        >
          <template #icon>
            <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
        </StatCard>

        <StatCard
          title="Avg Distance"
          :value="`${profile.stats.averageDistance} km`"
          color="primary"
        >
          <template #icon>
            <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </template>
        </StatCard>
      </div>

      <!-- Recent Trainings & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Trainings -->
        <div class="lg:col-span-2">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-dark-50">Recent Workouts</h2>
            <button @click="showAddTraining = true" class="btn-primary">
              + Add Workout
            </button>
          </div>

          <div v-if="trainingsLoading" class="flex justify-center py-12">
            <LoadingSpinner />
          </div>

          <div v-else-if="trainings.length === 0" class="card p-12 text-center">
            <p class="text-dark-400 mb-4">No workouts yet</p>
            <button @click="showAddTraining = true" class="btn-primary">
              Log Your First Run
            </button>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="training in trainings"
              :key="training.id"
              class="card p-6 hover:border-primary-500 transition-all cursor-pointer"
              @click="viewTraining(training.id)"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium"
                      :class="training.completed ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'"
                    >
                      {{ training.completed ? 'Completed' : 'Planned' }}
                    </span>
                    <span class="text-dark-400 text-sm">
                      {{ formatDate(training.date) }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-6 text-dark-200">
                    <div>
                      <span class="text-2xl font-bold">{{ training.distance }}</span>
                      <span class="text-sm ml-1">km</span>
                    </div>
                    <div>
                      <span class="text-2xl font-bold">{{ training.duration }}</span>
                      <span class="text-sm ml-1">min</span>
                    </div>
                    <div v-if="training.mood" class="text-sm">
                      {{ moodEmoji(training.mood) }}
                    </div>
                  </div>
                  <p v-if="training.notes" class="text-dark-400 text-sm mt-2">
                    {{ training.notes }}
                  </p>
                </div>
                <svg class="w-6 h-6 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div>
          <h2 class="text-2xl font-bold text-dark-50 mb-6">Quick Actions</h2>
          <div class="space-y-4">
            <router-link to="/motivation" class="card p-6 block hover:border-primary-500 transition-all">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-dark-50">Motivation Feed</p>
                  <p class="text-sm text-dark-400">View all messages</p>
                </div>
              </div>
            </router-link>

            <button @click="generateTrainingPlan" class="card p-6 block w-full text-left hover:border-primary-500 transition-all">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-dark-50">Training Plan</p>
                  <p class="text-sm text-dark-400">Generate your plan</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Add Training Modal -->
      <div
        v-if="showAddTraining"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        @click.self="showAddTraining = false"
      >
        <div class="card p-8 max-w-md w-full">
          <h3 class="text-2xl font-bold text-dark-50 mb-6">Log Workout</h3>
          <form @submit.prevent="handleAddTraining" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Date</label>
              <input v-model="newTraining.date" type="date" required class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Distance (km)</label>
              <input v-model.number="newTraining.distance" type="number" step="0.1" required class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Duration (minutes)</label>
              <input v-model.number="newTraining.duration" type="number" required class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Mood</label>
              <select v-model="newTraining.mood" class="input">
                <option value="TIRED">😴 Tired</option>
                <option value="NORMAL">😊 Normal</option>
                <option value="ENERGIZED">🔥 Energized</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Notes (optional)</label>
              <textarea v-model="newTraining.notes" class="input" rows="3"></textarea>
            </div>
            <div class="flex items-center space-x-3">
              <input v-model="newTraining.completed" type="checkbox" id="completed" class="w-4 h-4" />
              <label for="completed" class="text-sm text-dark-200">Mark as completed</label>
            </div>
            <div class="flex space-x-4">
              <button type="submit" class="btn-primary flex-1">Save</button>
              <button type="button" @click="showAddTraining = false" class="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTrainingStore } from '@/stores/training'
import { useMotivationStore } from '@/stores/motivation'
import { userApi } from '@/api/user'
import { format } from 'date-fns'
import Navbar from '@/components/Navbar.vue'
import StatCard from '@/components/StatCard.vue'
import MotivationCard from '@/components/MotivationCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const router = useRouter()
const authStore = useAuthStore()
const trainingStore = useTrainingStore()
const motivationStore = useMotivationStore()

const user = computed(() => authStore.user)
const profile = ref<any>(null)
const trainings = computed(() => trainingStore.trainings)
const trainingsLoading = computed(() => trainingStore.loading)
const latestMotivation = computed(() => motivationStore.latestMessage)

const showAddTraining = ref(false)
const newTraining = ref({
  date: new Date().toISOString().split('T')[0],
  distance: 0,
  duration: 0,
  mood: 'NORMAL',
  notes: '',
  completed: false,
})

const goalLabel = computed(() => {
  const goalMap: any = {
    FIVE_K: '5K',
    TEN_K: '10K',
    HALF: 'Half Marathon',
    FULL: 'Full Marathon',
  }
  return goalMap[user.value?.goal] || 'Marathon'
})

const formatDate = (date: string) => {
  return format(new Date(date), 'MMM dd, yyyy')
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

const moodEmoji = (mood: string) => {
  const emojiMap: any = {
    TIRED: '😴',
    NORMAL: '😊',
    ENERGIZED: '🔥',
  }
  return emojiMap[mood] || '😊'
}

const handleAddTraining = async () => {
  await trainingStore.createTraining(newTraining.value)
  showAddTraining.value = false
  newTraining.value = {
    date: new Date().toISOString().split('T')[0],
    distance: 0,
    duration: 0,
    mood: 'NORMAL',
    notes: '',
    completed: false,
  }
  await fetchData()
}

const viewTraining = (id: string) => {
  router.push(`/training/${id}`)
}

const generateTrainingPlan = async () => {
  if (user.value?.goal && user.value?.level) {
    await trainingStore.generatePlan(user.value.goal, user.value.level)
    alert(`Training plan generated! ${trainingStore.trainingPlan?.duration} weeks to your ${goalLabel.value}`)
  }
}

const fetchData = async () => {
  await Promise.all([
    trainingStore.fetchTrainings(10),
    motivationStore.fetchLatest(),
    userApi.getProfile().then((data) => (profile.value = data)),
  ])
}

onMounted(() => {
  fetchData()
})
</script>

