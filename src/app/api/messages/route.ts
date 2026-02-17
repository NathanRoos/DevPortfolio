import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Database error:', error);
    
    // Fallback data if database is not available
    const fallbackMessages = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        message: 'Hi Nathan, I\'d like to discuss a potential project involving Kubernetes migration. Could we schedule a call?',
        createdAt: new Date('2024-01-15').toISOString(),
        user: null
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@techcorp.com',
        message: 'Your portfolio looks impressive! We have a React/Next.js project that might be a great fit for your skills.',
        createdAt: new Date('2024-01-10').toISOString(),
        user: null
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike.chen@startup.io',
        message: 'Interested in your DevOps expertise. We need help with our CI/CD pipeline and AWS infrastructure.',
        createdAt: new Date('2024-01-05').toISOString(),
        user: null
      }
    ];
    
    return NextResponse.json(fallbackMessages);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, userId } = body;

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        userId: userId || null
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}