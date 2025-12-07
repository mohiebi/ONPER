/**
 * Type Definitions for ONPER Frontend
 */

export interface User {
  id: string
  email: string
  name: string
  goal: Goal
  level: Level
  createdAt: string
}

export interface UserProfile extends User {
  stats: UserStats
}

export interface UserStats {
  totalRuns: number
  totalDistance: number
  totalDuration: number
  averageDistance: number
}

export type Goal = 'FIVE_K' | 'TEN_K' | 'HALF' | 'FULL'
export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
export type Mood = 'TIRED' | 'NORMAL' | 'ENERGIZED'
export type TriggerType = 'COMPLETED' | 'MISSED' | 'MILESTONE' | 'REMINDER'

export interface Training {
  id: string
  userId: string
  date: string
  distance: number
  duration: number
  mood: Mood
  completed: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface MotivationLog {
  id: string
  userId: string
  trigger: TriggerType
  message: string
  createdAt: string
}

export interface TrainingPlan {
  goal: Goal
  level: Level
  duration: number
  plan: WeeklySchedule[]
}

export interface WeeklySchedule {
  week: number
  runs: Run[]
}

export interface Run {
  day: number
  distance: number
  type: 'Easy Run' | 'Tempo Run' | 'Long Run'
}

export interface AuthResponse {
  accessToken: string
  user: User
}

