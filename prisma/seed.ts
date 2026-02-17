import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default admin user
  await prisma.user.createMany({
    data: [
      {
        auth0Id: process.env.DEFAULT_ADMIN_AUTH0_ID!,
        email: 'admin@portfolio.local',
        name: 'Admin',
        role: 'ADMIN',
      },
    ],
    skipDuplicates: true, // safe to re-run
  });

  // Seed sample projects
  await prisma.project.createMany({
    data: [
      {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform built with Next.js, PostgreSQL, and Stripe integration.',
        repoUrl: 'https://github.com/example/ecommerce-platform',
        liveUrl: 'https://ecommerce-demo.vercel.app',
        tags: ['Next.js', 'PostgreSQL', 'Stripe', 'TypeScript'],
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates using WebSockets.',
        repoUrl: 'https://github.com/example/task-manager',
        liveUrl: 'https://task-manager-demo.vercel.app',
        tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      },
      {
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard that displays current weather and forecasts for multiple cities.',
        repoUrl: 'https://github.com/example/weather-dashboard',
        liveUrl: 'https://weather-dashboard-demo.vercel.app',
        tags: ['Vue.js', 'OpenWeather API', 'Chart.js', 'CSS3'],
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seeded database with default admin and sample projects');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });