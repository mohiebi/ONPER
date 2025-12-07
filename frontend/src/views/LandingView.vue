<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero Section -->
    <div class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Logo -->
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-8">
          <span class="text-white font-bold text-3xl">1%</span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-5xl md:text-7xl font-bold mb-6">
          <span class="gradient-text">Join the 1%</span>
        </h1>
        <p class="text-xl md:text-2xl text-dark-300 mb-4">
          Less than 1% of humans can complete a marathon.
        </p>
        <p class="text-lg text-dark-400 mb-12">
          ONPER helps you train, track progress, and stay motivated to become part of the elite.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <router-link to="/register" class="btn-primary w-full sm:w-auto">
            Start Your Journey
          </router-link>
          <router-link to="/login" class="btn-outline w-full sm:w-auto">
            Sign In
          </router-link>
        </div>

        <!-- Features -->
        <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card p-6">
            <div class="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-dark-100 mb-2">Custom Training Plans</h3>
            <p class="text-dark-400">8-20 week plans tailored to your goal and experience level</p>
          </div>

          <div class="card p-6">
            <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-dark-100 mb-2">Progress Tracking</h3>
            <p class="text-dark-400">Log workouts and watch your stats grow</p>
          </div>

          <div class="card p-6">
            <div class="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-dark-100 mb-2">Daily Motivation</h3>
            <p class="text-dark-400">Inspirational messages to keep you pushing forward</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-16 pt-8 border-t border-dark-800">
          <p class="text-dark-500 text-sm">
            "The difference between the impossible and the possible lies in determination."
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Landing page for unauthenticated users
</script>

