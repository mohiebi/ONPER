/**
 * Data Transfer Object for Creating Training Session
 */

import { IsDateString, IsNumber, IsEnum, IsBoolean, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainingDto {
  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 5.0, description: 'Distance in kilometers' })
  @IsNumber()
  @Min(0)
  distance: number;

  @ApiProperty({ example: 30, description: 'Duration in minutes' })
  @IsNumber()
  @Min(0)
  duration: number;

  @ApiProperty({ 
    enum: ['TIRED', 'NORMAL', 'ENERGIZED'],
    example: 'NORMAL',
    required: false 
  })
  @IsEnum(['TIRED', 'NORMAL', 'ENERGIZED'])
  @IsOptional()
  mood?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiProperty({ example: 'Great run today!', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

