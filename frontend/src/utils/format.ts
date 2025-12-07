/**
 * Formatting Utilities
 */

import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (date: string | Date, formatString = 'MMM dd, yyyy'): string => {
  return format(new Date(date), formatString)
}

export const formatTimeAgo = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

export const formatDistance = (kilometers: number, decimals = 1): string => {
  return `${kilometers.toFixed(decimals)} km`
}

export const formatPace = (duration: number, distance: number): string => {
  if (distance === 0) return '0:00'
  const pace = duration / distance
  const minutes = Math.floor(pace)
  const seconds = Math.round((pace - minutes) * 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const goalToLabel = (goal: string): string => {
  const labels: Record<string, string> = {
    FIVE_K: '5K',
    TEN_K: '10K',
    HALF: 'Half Marathon',
    FULL: 'Full Marathon',
  }
  return labels[goal] || goal
}

export const levelToLabel = (level: string): string => {
  const labels: Record<string, string> = {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
  }
  return labels[level] || level
}

