/**
 * User Service
 * Handles user profile management and queries
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new user
   */
  async create(data: {
    email: string;
    name: string;
    passwordHash: string;
    goal?: string;
    level?: string;
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash: data.passwordHash,
        goal: data.goal as any,
        level: data.level as any,
      },
    });
  }

  /**
   * Find user by ID
   */
  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Update user profile
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        goal: updateUserDto.goal as any,
        level: updateUserDto.level as any,
      },
      select: {
        id: true,
        email: true,
        name: true,
        goal: true,
        level: true,
        createdAt: true,
      },
    });
  }

  /**
   * Get user profile with statistics
   */
  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        goal: true,
        level: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get training statistics
    const trainings = await this.prisma.training.findMany({
      where: { userId: id },
      orderBy: { date: 'desc' },
    });

    const completedTrainings = trainings.filter((t) => t.completed);
    const totalDistance = completedTrainings.reduce((sum, t) => sum + t.distance, 0);
    const totalDuration = completedTrainings.reduce((sum, t) => sum + t.duration, 0);

    return {
      ...user,
      stats: {
        totalRuns: completedTrainings.length,
        totalDistance: Math.round(totalDistance * 10) / 10,
        totalDuration,
        averageDistance: completedTrainings.length > 0 
          ? Math.round((totalDistance / completedTrainings.length) * 10) / 10 
          : 0,
      },
    };
  }
}

