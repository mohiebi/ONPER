/**
 * Notification Controller
 * Handles HTTP requests for notification management
 */

import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * Get notification preferences
   */
  @Get('preferences')
  @ApiOperation({ summary: 'Get notification preferences' })
  @ApiResponse({ status: 200, description: 'Preferences retrieved' })
  getPreferences(@CurrentUser() user: any) {
    return this.notificationService.getPreferences(user.id);
  }

  /**
   * Check for missed workouts
   */
  @Post('check-missed')
  @ApiOperation({ summary: 'Check for missed workouts and send reminders' })
  @ApiResponse({ status: 200, description: 'Missed workouts checked' })
  checkMissed(@CurrentUser() user: any) {
    return this.notificationService.checkMissedWorkouts(user.id);
  }

  /**
   * Send daily reminder
   */
  @Post('daily-reminder')
  @ApiOperation({ summary: 'Send daily training reminder' })
  @ApiResponse({ status: 200, description: 'Daily reminder sent' })
  sendReminder(@CurrentUser() user: any) {
    return this.notificationService.sendDailyReminder(user.id);
  }
}

