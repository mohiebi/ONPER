/**
 * Data Transfer Object for Updating User Profile
 */

import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', required: false })
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    enum: ['FIVE_K', 'TEN_K', 'HALF', 'FULL'],
    example: 'FULL',
    required: false 
  })
  @IsEnum(['FIVE_K', 'TEN_K', 'HALF', 'FULL'])
  @IsOptional()
  goal?: string;

  @ApiProperty({ 
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
    example: 'BEGINNER',
    required: false 
  })
  @IsEnum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
  @IsOptional()
  level?: string;
}

