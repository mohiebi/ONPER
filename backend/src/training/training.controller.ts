/**
 * Training Controller
 * Handles HTTP requests for training session management
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('training')
@Controller('training')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  /**
   * Create a new training session
   */
  @Post()
  @ApiOperation({ summary: 'Create a new training session' })
  @ApiResponse({ status: 201, description: 'Training session created' })
  create(@CurrentUser() user: any, @Body() createTrainingDto: CreateTrainingDto) {
    return this.trainingService.create(user.id, createTrainingDto);
  }

  /**
   * Get all training sessions for current user
   */
  @Get()
  @ApiOperation({ summary: 'Get all training sessions' })
  @ApiResponse({ status: 200, description: 'Training sessions retrieved' })
  findAll(@CurrentUser() user: any, @Query('limit') limit?: string) {
    return this.trainingService.findAll(user.id, limit ? parseInt(limit) : undefined);
  }

  /**
   * Generate training plan
   */
  @Get('plan')
  @ApiOperation({ summary: 'Generate training plan based on goal and level' })
  @ApiResponse({ status: 200, description: 'Training plan generated' })
  generatePlan(
    @CurrentUser() user: any,
    @Query('goal') goal: string,
    @Query('level') level: string,
  ) {
    return this.trainingService.generatePlan(user.id, goal, level);
  }

  /**
   * Get a specific training session
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific training session' })
  @ApiResponse({ status: 200, description: 'Training session retrieved' })
  @ApiResponse({ status: 404, description: 'Training session not found' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.trainingService.findOne(id, user.id);
  }

  /**
   * Update a training session
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a training session' })
  @ApiResponse({ status: 200, description: 'Training session updated' })
  @ApiResponse({ status: 404, description: 'Training session not found' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateTrainingDto: UpdateTrainingDto,
  ) {
    return this.trainingService.update(id, user.id, updateTrainingDto);
  }

  /**
   * Delete a training session
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a training session' })
  @ApiResponse({ status: 200, description: 'Training session deleted' })
  @ApiResponse({ status: 404, description: 'Training session not found' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.trainingService.remove(id, user.id);
  }
}

