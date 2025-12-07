/**
 * Data Transfer Object for User Registration
 */

import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

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

