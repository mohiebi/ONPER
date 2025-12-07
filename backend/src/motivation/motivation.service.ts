/**
 * Motivation Service
 * Core feature: Generates and delivers motivational messages to users
 * Triggers on training completion, missed workouts, and milestones
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MotivationService {
  constructor(private readonly prisma: PrismaService) {}

  // Motivational message bank - organized by trigger type
  private readonly messages = {
    COMPLETED: [
      'Yesterday you were ahead of 99% of people — today just beat yourself.',
      'Every mile you run is a step closer to the 1%.',
      'Champions are made when no one is watching. You showed up today.',
      'Your future self is thanking you for this run.',
      'The hardest step is out the door. You nailed it.',
      'Progress isn\'t always fast, but it\'s always forward. Keep going.',
      'You didn\'t come this far to only come this far.',
      'Today you proved that excuses don\'t run marathons.',
      'Excellence is a habit. You just practiced it.',
      'The distance between dreams and reality is called action. You took it.',
    ],
    MISSED: [
      'A single step forward is still progress. Let\'s start again.',
      'Missing one workout doesn\'t break you. Not coming back does.',
      'The comeback is always stronger than the setback.',
      'Your goals are waiting. They haven\'t gone anywhere.',
      'Every champion has faced a setback. What matters is the bounce back.',
      'Today is a new opportunity to become who you want to be.',
      'The path to the 1% isn\'t straight. Get back on it.',
      'You\'re not starting over, you\'re starting with experience.',
      'Discipline is choosing between what you want now and what you want most.',
      'The only workout you regret is the one you didn\'t do. Let\'s change that.',
    ],
    MILESTONE: [
      'You\'ve just crossed a major milestone! The 1% is getting closer.',
      'Look how far you\'ve come! Most people never even start.',
      'This is what dedication looks like. You\'re inspiring.',
      'Milestone unlocked! Your consistency is building something incredible.',
      'You\'re not just running, you\'re rewriting your limits.',
      'This achievement puts you ahead of 99% of people who only dream.',
      'Every milestone is proof that your goals aren\'t just dreams.',
      'You\'ve earned this moment. Celebrate it, then keep pushing.',
      'The difference between ordinary and extraordinary is you, right now.',
      'Your progress is the definition of commitment. Keep this energy.',
    ],
    REMINDER: [
      'Your running shoes are waiting. Your future self will thank you.',
      'The 1% is built one run at a time. Today is your time.',
      'Champions don\'t wait for motivation. They create it. Let\'s go.',
      'Your training plan is waiting. Consistency builds legends.',
      'Every run brings you closer to your goal. Don\'t let today slip.',
      'The hardest part is starting. Everything else is momentum.',
      'Your body is capable of amazing things. Prove it today.',
      'Comfort zone is where dreams go to die. Step out and run.',
      'You committed to this journey. Honor that commitment today.',
      'Time passes anyway. Make it count with a run.',
    ],
  };

  /**
   * Trigger motivation based on user action
   * This is the core motivation system logic
   */
  async triggerMotivation(
    userId: string,
    trigger: 'COMPLETED' | 'MISSED' | 'MILESTONE' | 'REMINDER',
    trainingData?: any,
  ) {
    // Select appropriate motivational message
    const message = this.selectMessage(trigger, trainingData);

    // Log the motivation
    const motivationLog = await this.prisma.motivationLog.create({
      data: {
        userId,
        trigger,
        message,
      },
    });

    return {
      ...motivationLog,
      type: trigger.toLowerCase(),
    };
  }

  /**
   * Select an appropriate motivational message
   * Can be enhanced with AI in future versions
   */
  private selectMessage(
    trigger: 'COMPLETED' | 'MISSED' | 'MILESTONE' | 'REMINDER',
    trainingData?: any,
  ): string {
    const messageBank = this.messages[trigger];
    
    // For now, randomly select a message
    // Future: Use AI to personalize based on user history, mood, progress
    const randomIndex = Math.floor(Math.random() * messageBank.length);
    return messageBank[randomIndex];
  }

  /**
   * Get all motivation logs for a user
   */
  async getMotivationHistory(userId: string, limit?: number) {
    return this.prisma.motivationLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit || 20,
    });
  }

  /**
   * Get latest motivation message for user
   */
  async getLatestMotivation(userId: string) {
    return this.prisma.motivationLog.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Check for milestones and trigger appropriate motivation
   */
  async checkMilestones(userId: string) {
    const trainings = await this.prisma.training.findMany({
      where: { userId, completed: true },
      orderBy: { date: 'desc' },
    });

    const totalRuns = trainings.length;
    const totalDistance = trainings.reduce((sum, t) => sum + t.distance, 0);

    // Define milestone thresholds
    const milestones = [
      { runs: 5, distance: null, message: 'You\'ve completed 5 runs! You\'re building momentum.' },
      { runs: 10, distance: null, message: '10 runs completed! You\'re in the top 10% of people who start.' },
      { runs: 25, distance: null, message: '25 runs! Your consistency is remarkable.' },
      { runs: 50, distance: null, message: '50 runs! You\'ve proven this isn\'t just a phase.' },
      { runs: 100, distance: null, message: '100 runs! You\'re officially elite.' },
      { runs: null, distance: 100, message: 'You\'ve run 100km! That\'s like running from city to city!' },
      { runs: null, distance: 250, message: '250km total! You could have run across multiple states!' },
      { runs: null, distance: 500, message: '500km! You\'re in ultra-marathon territory now!' },
    ];

    // Check if user just hit a milestone
    for (const milestone of milestones) {
      if (milestone.runs && totalRuns === milestone.runs) {
        return this.triggerMotivation(userId, 'MILESTONE', { milestone: milestone.runs });
      }
      if (milestone.distance && Math.floor(totalDistance) === milestone.distance) {
        return this.triggerMotivation(userId, 'MILESTONE', { milestone: milestone.distance });
      }
    }

    return null;
  }

  /**
   * Generate daily motivation reminder
   * Can be called by a scheduler/cron job
   */
  async sendDailyReminder(userId: string) {
    // Check if user has trained today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTraining = await this.prisma.training.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
        completed: true,
      },
    });

    // If no training today, send reminder
    if (!todayTraining) {
      return this.triggerMotivation(userId, 'REMINDER');
    }

    return null;
  }
}

