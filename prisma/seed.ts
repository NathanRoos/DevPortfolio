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

  // Seed sample projects (bilingual)
  const sampleProjects = [
    {
      tags: ['Next.js', 'PostgreSQL', 'Stripe', 'TypeScript'],
      translations: [
        {
          language: 'en',
          title: 'E-commerce Platform',
          description: 'A full-stack e-commerce platform built with Next.js, PostgreSQL, and Stripe integration.',
          repoUrl: 'https://github.com/example/ecommerce-platform',
          liveUrl: 'https://ecommerce-demo.vercel.app',
        },
        {
          language: 'fr',
          title: 'Plateforme E-commerce',
          description: 'Une plateforme e-commerce complète construite avec Next.js, PostgreSQL et Stripe.',
          repoUrl: 'https://github.com/example/ecommerce-platform',
          liveUrl: 'https://ecommerce-demo.vercel.app',
        }
      ]
    },
    {
      tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      translations: [
        {
          language: 'en',
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates using WebSockets.',
          repoUrl: 'https://github.com/example/task-manager',
          liveUrl: 'https://task-manager-demo.vercel.app',
        },
        {
          language: 'fr',
          title: 'Gestionnaire de tâches',
          description: 'Une application collaborative de gestion de tâches avec mises à jour en temps réel via WebSockets.',
          repoUrl: 'https://github.com/example/task-manager',
          liveUrl: 'https://task-manager-demo.vercel.app',
        }
      ]
    },
    {
      tags: ['Vue.js', 'OpenWeather API', 'Chart.js', 'CSS3'],
      translations: [
        {
          language: 'en',
          title: 'Weather Dashboard',
          description: 'A responsive weather dashboard that displays current weather and forecasts for multiple cities.',
          repoUrl: 'https://github.com/example/weather-dashboard',
          liveUrl: 'https://weather-dashboard-demo.vercel.app',
        },
        {
          language: 'fr',
          title: 'Tableau météo',
          description: 'Un tableau météo réactif affichant la météo actuelle et les prévisions pour plusieurs villes.',
          repoUrl: 'https://github.com/example/weather-dashboard',
          liveUrl: 'https://weather-dashboard-demo.vercel.app',
        }
      ]
    }
  ];

  for (const project of sampleProjects) {
    const created = await prisma.project.create({
      data: {
        tags: project.tags,
      }
    });
    for (const translation of project.translations) {
      await prisma.projectTranslation.create({
        data: {
          projectId: created.id,
          language: translation.language,
          title: translation.title,
          description: translation.description,
          repoUrl: translation.repoUrl,
          liveUrl: translation.liveUrl,
        }
      });
    }
  }

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