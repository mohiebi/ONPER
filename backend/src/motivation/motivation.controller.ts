/**
 * Motivation Controller
 * Handles HTTP requests for motivation system
 */

import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MotivationService } from './motivation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('motivation')
@Controller('motivation')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MotivationController {
  constructor(private readonly motivationService: MotivationService) {}

  /**
   * Get motivation history
   */
  @Get('history')
  @ApiOperation({ summary: 'Get motivation history for current user' })
  @ApiResponse({ status: 200, description: 'Motivation history retrieved' })
  getHistory(@CurrentUser() user: any, @Query('limit') limit?: string) {
    return this.motivationService.getMotivationHistory(
      user.id,
      limit ? parseInt(limit) : undefined,
    );
  }

  /**
   * Get latest motivation
   */
  @Get('latest')
  @ApiOperation({ summary: 'Get latest motivation message' })
  @ApiResponse({ status: 200, description: 'Latest motivation retrieved' })
  getLatest(@CurrentUser() user: any) {
    return this.motivationService.getLatestMotivation(user.id);
  }

  /**
   * Check for milestones
   */
  @Post('check-milestones')
  @ApiOperation({ summary: 'Check and trigger milestone motivations' })
  @ApiResponse({ status: 200, description: 'Milestones checked' })
  checkMilestones(@CurrentUser() user: any) {
    return this.motivationService.checkMilestones(user.id);
  }

  /**
   * Send daily reminder
   */
  @Post('daily-reminder')
  @ApiOperation({ summary: 'Send daily motivation reminder' })
  @ApiResponse({ status: 200, description: 'Reminder sent' })
  sendReminder(@CurrentUser() user: any) {
    return this.motivationService.sendDailyReminder(user.id);
  }
}

