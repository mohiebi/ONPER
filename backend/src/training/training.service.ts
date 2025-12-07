/**
 * Training Service
 * Manages training sessions and workout tracking
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { MotivationService } from '../motivation/motivation.service';

@Injectable()
export class TrainingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly motivationService: MotivationService,
  ) {}

  /**
   * Create a new training session
   */
  async create(userId: string, createTrainingDto: CreateTrainingDto) {
    const training = await this.prisma.training.create({
      data: {
        userId,
        date: new Date(createTrainingDto.date),
        distance: createTrainingDto.distance,
        duration: createTrainingDto.duration,
        mood: createTrainingDto.mood as any,
        completed: createTrainingDto.completed,
        notes: createTrainingDto.notes,
      },
    });

    // If training is marked as completed, trigger motivation
    if (training.completed) {
      await this.motivationService.triggerMotivation(userId, 'COMPLETED', training);
    }

    return training;
  }

  /**
   * Get all training sessions for a user
   */
  async findAll(userId: string, limit?: number) {
    return this.prisma.training.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: limit,
    });
  }

  /**
   * Get a specific training session
   */
  async findOne(id: string, userId: string) {
    const training = await this.prisma.training.findFirst({
      where: { id, userId },
    });

    if (!training) {
      throw new NotFoundException('Training session not found');
    }

    return training;
  }

  /**
   * Update a training session
   */
  async update(id: string, userId: string, updateTrainingDto: UpdateTrainingDto) {
    const training = await this.prisma.training.findFirst({
      where: { id, userId },
    });

    if (!training) {
      throw new NotFoundException('Training session not found');
    }

    const wasCompleted = training.completed;
    const willBeCompleted = updateTrainingDto.completed ?? training.completed;

    const updatedTraining = await this.prisma.training.update({
      where: { id },
      data: {
        date: updateTrainingDto.date ? new Date(updateTrainingDto.date) : undefined,
        distance: updateTrainingDto.distance,
        duration: updateTrainingDto.duration,
        mood: updateTrainingDto.mood as any,
        completed: updateTrainingDto.completed,
        notes: updateTrainingDto.notes,
      },
    });

    // If training just got completed, trigger motivation
    if (!wasCompleted && willBeCompleted) {
      await this.motivationService.triggerMotivation(userId, 'COMPLETED', updatedTraining);
    }

    return updatedTraining;
  }

  /**
   * Delete a training session
   */
  async remove(id: string, userId: string) {
    const training = await this.prisma.training.findFirst({
      where: { id, userId },
    });

    if (!training) {
      throw new NotFoundException('Training session not found');
    }

    await this.prisma.training.delete({
      where: { id },
    });

    return { message: 'Training session deleted successfully' };
  }

  /**
   * Generate a simple training plan based on user goal and level
   */
  async generatePlan(userId: string, goal: string, level: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Simple rule-based training plan generation
    const plan = this.createTrainingPlan(goal, level);
    
    return {
      goal,
      level,
      duration: plan.weeks,
      plan: plan.schedule,
    };
  }

  /**
   * Create a training plan based on goal and level
   * This is a simplified version - can be enhanced with more sophisticated logic
   */
  private createTrainingPlan(goal: string, level: string) {
    const plans: any = {
      FIVE_K: {
        BEGINNER: { weeks: 8, schedule: this.generateWeeklySchedule(8, 3, 2, 5) },
        INTERMEDIATE: { weeks: 6, schedule: this.generateWeeklySchedule(6, 4, 3, 8) },
        ADVANCED: { weeks: 4, schedule: this.generateWeeklySchedule(4, 5, 5, 10) },
      },
      TEN_K: {
        BEGINNER: { weeks: 12, schedule: this.generateWeeklySchedule(12, 3, 3, 8) },
        INTERMEDIATE: { weeks: 10, schedule: this.generateWeeklySchedule(10, 4, 5, 12) },
        ADVANCED: { weeks: 8, schedule: this.generateWeeklySchedule(8, 5, 7, 15) },
      },
      HALF: {
        BEGINNER: { weeks: 16, schedule: this.generateWeeklySchedule(16, 4, 5, 15) },
        INTERMEDIATE: { weeks: 14, schedule: this.generateWeeklySchedule(14, 4, 8, 18) },
        ADVANCED: { weeks: 12, schedule: this.generateWeeklySchedule(12, 5, 10, 21) },
      },
      FULL: {
        BEGINNER: { weeks: 20, schedule: this.generateWeeklySchedule(20, 4, 8, 35) },
        INTERMEDIATE: { weeks: 18, schedule: this.generateWeeklySchedule(18, 5, 12, 38) },
        ADVANCED: { weeks: 16, schedule: this.generateWeeklySchedule(16, 5, 15, 42) },
      },
    };

    return plans[goal]?.[level] || plans.FULL.BEGINNER;
  }

  /**
   * Generate weekly training schedule
   */
  private generateWeeklySchedule(
    weeks: number,
    runsPerWeek: number,
    startDistance: number,
    endDistance: number,
  ) {
    const schedule = [];
    const distanceIncrement = (endDistance - startDistance) / weeks;

    for (let week = 1; week <= weeks; week++) {
      const weeklyDistance = startDistance + (distanceIncrement * (week - 1));
      const runs = [];

      for (let run = 1; run <= runsPerWeek; run++) {
        // Vary run distances: short, medium, long
        let runDistance;
        if (run === runsPerWeek) {
          runDistance = weeklyDistance * 1.2; // Long run
        } else if (run === 1) {
          runDistance = weeklyDistance * 0.6; // Easy run
        } else {
          runDistance = weeklyDistance * 0.8; // Medium run
        }

        runs.push({
          day: run,
          distance: Math.round(runDistance * 10) / 10,
          type: run === runsPerWeek ? 'Long Run' : run === 1 ? 'Easy Run' : 'Tempo Run',
        });
      }

      schedule.push({
        week,
        runs,
      });
    }

    return schedule;
  }
}

