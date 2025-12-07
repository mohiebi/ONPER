/**
 * Database seeding script
 * Populates the database with initial motivational messages and test data
 */

import { PrismaClient, Mood, TriggerType, Goal, Level } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@onper.com' },
    update: {},
    create: {
      email: 'demo@onper.com',
      name: 'Demo Runner',
      passwordHash: hashedPassword,
      goal: Goal.FULL,
      level: Level.BEGINNER,
    },
  });

  console.log('✅ Demo user created:', demoUser.email);

  // Create sample training sessions
  const today = new Date();
  const trainingSessions = [
    {
      userId: demoUser.id,
      date: new Date(today.setDate(today.getDate() - 7)),
      distance: 5.0,
      duration: 30,
      mood: Mood.NORMAL,
      completed: true,
      notes: 'First run of the week!',
    },
    {
      userId: demoUser.id,
      date: new Date(today.setDate(today.getDate() - 5)),
      distance: 7.5,
      duration: 45,
      mood: Mood.ENERGIZED,
      completed: true,
      notes: 'Felt great today',
    },
    {
      userId: demoUser.id,
      date: new Date(today.setDate(today.getDate() - 3)),
      distance: 10.0,
      duration: 60,
      mood: Mood.TIRED,
      completed: true,
      notes: 'Long run, but completed!',
    },
  ];

  for (const session of trainingSessions) {
    await prisma.training.create({
      data: session,
    });
  }

  console.log('✅ Sample training sessions created');

  // Create sample motivation logs
  await prisma.motivationLog.create({
    data: {
      userId: demoUser.id,
      trigger: TriggerType.COMPLETED,
      message: 'Yesterday you were ahead of 99% of people — today just beat yourself.',
    },
  });

  await prisma.motivationLog.create({
    data: {
      userId: demoUser.id,
      trigger: TriggerType.MILESTONE,
      message: 'You\'ve completed 3 runs this week! You\'re becoming unstoppable.',
    },
  });

  console.log('✅ Sample motivation logs created');
  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

