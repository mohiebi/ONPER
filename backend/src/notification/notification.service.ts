/**
 * Notification Service
 * Handles notification scheduling and delivery
 * In MVP: simulates push notifications
 * Future: integrate with FCM, APNs, or email service
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MotivationService } from '../motivation/motivation.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly motivationService: MotivationService,
  ) {}

  /**
   * Schedule a notification for a user
   * In MVP: stores notification data for later retrieval
   * Future: integrate with push notification service
   */
  async scheduleNotification(
    userId: string,
    type: 'REMINDER' | 'MOTIVATION' | 'MILESTONE',
    scheduledFor: Date,
    message: string,
  ) {
    // In production, this would integrate with a notification service
    // For MVP, we'll return the notification structure
    return {
      userId,
      type,
      scheduledFor,
      message,
      status: 'scheduled',
      note: 'In MVP mode - notification would be sent via push service in production',
    };
  }

  /**
   * Send immediate notification
   * Simulated for MVP
   */
  async sendNotification(
    userId: string,
    type: 'REMINDER' | 'MOTIVATION' | 'MILESTONE',
    message: string,
  ) {
    console.log(`[NOTIFICATION] Sending to user ${userId}: ${message}`);
    
    return {
      userId,
      type,
      message,
      sentAt: new Date(),
      status: 'sent',
      note: 'In MVP mode - would use FCM/APNs in production',
    };
  }

  /**
   * Check for missed workouts and send reminders
   */
  async checkMissedWorkouts(userId: string) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);

    // Check if user had a planned workout yesterday
    const yesterdayTraining = await this.prisma.training.findFirst({
      where: {
        userId,
        date: {
          gte: yesterday,
          lt: todayStart,
        },
      },
    });

    // If training exists but not completed, send reminder
    if (yesterdayTraining && !yesterdayTraining.completed) {
      const motivation = await this.motivationService.triggerMotivation(userId, 'MISSED');
      
      return this.sendNotification(
        userId,
        'REMINDER',
        motivation.message,
      );
    }

    return null;
  }

  /**
   * Send daily reminder to user
   */
  async sendDailyReminder(userId: string) {
    const motivation = await this.motivationService.sendDailyReminder(userId);
    
    if (motivation) {
      return this.sendNotification(
        userId,
        'REMINDER',
        motivation.message,
      );
    }

    return {
      message: 'User has already trained today',
      status: 'skipped',
    };
  }

  /**
   * Get notification preferences (future feature)
   */
  async getPreferences(userId: string) {
    // Future: store user notification preferences in database
    return {
      userId,
      enabled: true,
      types: ['REMINDER', 'MOTIVATION', 'MILESTONE'],
      quietHours: {
        start: '22:00',
        end: '07:00',
      },
      frequency: 'daily',
      note: 'Preferences feature ready for future implementation',
    };
  }
}

