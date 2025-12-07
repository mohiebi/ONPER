/**
 * Root Application Module
 * Imports and configures all feature modules
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrainingModule } from './training/training.module';
import { MotivationModule } from './motivation/motivation.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Database module
    PrismaModule,
    
    // Feature modules
    AuthModule,
    UserModule,
    TrainingModule,
    MotivationModule,
    NotificationModule,
  ],
})
export class AppModule {}

