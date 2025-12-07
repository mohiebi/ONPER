<template>
  <div class="page-container">
    <Navbar />
    
    <div class="page-content">
      <div v-if="loading" class="flex justify-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else-if="training" class="max-w-3xl mx-auto">
        <!-- Back Button -->
        <button
          @click="router.back()"
          class="flex items-center space-x-2 text-dark-400 hover:text-dark-200 mb-6 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <!-- Training Details -->
        <div class="card p-8">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-dark-50">Workout Details</h1>
            <span
              class="px-4 py-2 rounded-full text-sm font-medium"
              :class="training.completed ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'"
            >
              {{ training.completed ? 'Completed' : 'Planned' }}
            </span>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <p class="text-dark-400 text-sm mb-1">Date</p>
              <p class="text-2xl font-bold text-dark-50">{{ formatDate(training.date) }}</p>
            </div>
            <div>
              <p class="text-dark-400 text-sm mb-1">Distance</p>
              <p class="text-2xl font-bold text-dark-50">{{ training.distance }} km</p>
            </div>
            <div>
              <p class="text-dark-400 text-sm mb-1">Duration</p>
              <p class="text-2xl font-bold text-dark-50">{{ training.duration }} min</p>
            </div>
            <div>
              <p class="text-dark-400 text-sm mb-1">Pace</p>
              <p class="text-2xl font-bold text-dark-50">{{ pace }} min/km</p>
            </div>
          </div>

          <!-- Mood -->
          <div class="mb-8">
            <p class="text-dark-400 text-sm mb-2">Mood</p>
            <div class="flex items-center space-x-3">
              <span class="text-3xl">{{ moodEmoji(training.mood) }}</span>
              <span class="text-lg text-dark-50">{{ moodLabel(training.mood) }}</span>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="training.notes" class="mb-8">
            <p class="text-dark-400 text-sm mb-2">Notes</p>
            <p class="text-dark-50">{{ training.notes }}</p>
          </div>

          <!-- Actions -->
          <div class="flex space-x-4">
            <button
              v-if="!training.completed"
              @click="markAsCompleted"
              class="btn-primary flex-1"
            >
              Mark as Completed
            </button>
            <button @click="showEditModal = true" class="btn-secondary">
              Edit
            </button>
            <button @click="handleDelete" class="btn-secondary text-red-500">
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div
        v-if="showEditModal && training"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        @click.self="showEditModal = false"
      >
        <div class="card p-8 max-w-md w-full">
          <h3 class="text-2xl font-bold text-dark-50 mb-6">Edit Workout</h3>
          <form @submit.prevent="handleUpdate" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Date</label>
              <input v-model="editForm.date" type="date" required class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Distance (km)</label>
              <input v-model.number="editForm.distance" type="number" step="0.1" required class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Duration (minutes)</label>
              <input v-model.number="editForm.duration" type="number" required class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Mood</label>
              <select v-model="editForm.mood" class="input">
                <option value="TIRED">😴 Tired</option>
                <option value="NORMAL">😊 Normal</option>
                <option value="ENERGIZED">🔥 Energized</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-dark-200 mb-2">Notes</label>
              <textarea v-model="editForm.notes" class="input" rows="3"></textarea>
            </div>
            <div class="flex items-center space-x-3">
              <input v-model="editForm.completed" type="checkbox" id="edit-completed" class="w-4 h-4" />
              <label for="edit-completed" class="text-sm text-dark-200">Mark as completed</label>
            </div>
            <div class="flex space-x-4">
              <button type="submit" class="btn-primary flex-1">Save Changes</button>
              <button type="button" @click="showEditModal = false" class="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTrainingStore } from '@/stores/training'
import { format } from 'date-fns'
import Navbar from '@/components/Navbar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const router = useRouter()
const route = useRoute()
const trainingStore = useTrainingStore()

const training = computed(() => trainingStore.currentTraining)
const loading = computed(() => trainingStore.loading)
const showEditModal = ref(false)

const editForm = ref({
  date: '',
  distance: 0,
  duration: 0,
  mood: 'NORMAL',
  notes: '',
  completed: false,
})

const pace = computed(() => {
  if (training.value && training.value.distance > 0) {
    const paceValue = training.value.duration / training.value.distance
    return paceValue.toFixed(2)
  }
  return '0'
})

const formatDate = (date: string) => {
  return format(new Date(date), 'EEEE, MMMM dd, yyyy')
}

const moodEmoji = (mood: string) => {
  const emojiMap: any = {
    TIRED: '😴',
    NORMAL: '😊',
    ENERGIZED: '🔥',
  }
  return emojiMap[mood] || '😊'
}

const moodLabel = (mood: string) => {
  const labelMap: any = {
    TIRED: 'Tired',
    NORMAL: 'Normal',
    ENERGIZED: 'Energized',
  }
  return labelMap[mood] || 'Normal'
}

const markAsCompleted = async () => {
  const id = route.params.id as string
  await trainingStore.updateTraining(id, { completed: true })
}

const handleUpdate = async () => {
  const id = route.params.id as string
  await trainingStore.updateTraining(id, editForm.value)
  showEditModal.value = false
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this workout?')) {
    const id = route.params.id as string
    await trainingStore.deleteTraining(id)
    router.push('/dashboard')
  }
}

onMounted(async () => {
  const id = route.params.id as string
  await trainingStore.fetchTraining(id)
  
  if (training.value) {
    editForm.value = {
      date: new Date(training.value.date).toISOString().split('T')[0],
      distance: training.value.distance,
      duration: training.value.duration,
      mood: training.value.mood,
      notes: training.value.notes || '',
      completed: training.value.completed,
    }
  }
})
</script>

