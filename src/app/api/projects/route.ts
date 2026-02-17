import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Database error:', error);
    
    // Fallback data if database is not available
    const fallbackProjects = [
      {
        id: '1',
        title: 'Portfolio Website',
        description: 'A modern portfolio website built with Next.js, featuring authentication, admin dashboard, and database integration.',
        repoUrl: 'https://github.com/nathanroos/portfolio',
        liveUrl: 'https://nathanroos.dev',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Auth0', 'PostgreSQL'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Kubernetes Dashboard',
        description: 'Custom Kubernetes dashboard for managing containerized applications with real-time monitoring and deployment capabilities.',
        repoUrl: 'https://github.com/nathanroos/k8s-dashboard',
        liveUrl: null,
        tags: ['React', 'Node.js', 'Kubernetes', 'Docker', 'TypeScript'],
        createdAt: new Date('2023-11-20'),
        updatedAt: new Date('2023-11-20')
      },
      {
        id: '3',
        title: 'Cloud Infrastructure Automation',
        description: 'Terraform modules and automation scripts for deploying scalable cloud infrastructure on AWS and Azure.',
        repoUrl: 'https://github.com/nathanroos/cloud-automation',
        liveUrl: null,
        tags: ['Terraform', 'AWS', 'Azure', 'CI/CD', 'Infrastructure as Code'],
        createdAt: new Date('2023-09-10'),
        updatedAt: new Date('2023-09-10')
      }
    ];
    
    return NextResponse.json(fallbackProjects);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, repoUrl, liveUrl, tags } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        repoUrl,
        liveUrl,
        tags
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}