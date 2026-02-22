export async function PATCH(request: Request) {
  try {
    const { id, translations, tags } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }
    // Update tags in Project
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { tags },
    });
    // Update translations
    if (translations && Array.isArray(translations)) {
      for (const t of translations) {
        await prisma.projectTranslation.update({
          where: { id: t.id },
          data: {
            title: t.title,
            description: t.description,
            repoUrl: t.repoUrl,
            liveUrl: t.liveUrl,
            language: t.language
          }
        });
      }
    }
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') || 'en';
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        translations: true
      }
    });
    // Filter to only the translation matching the language
    const projectsWithTranslation = projects.map(project => {
      const translation = project.translations.find(t => t.language === lang);
      return translation ? {
        id: project.id,
        tags: project.tags,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        ...translation
      } : null;
    }).filter(Boolean);
    return NextResponse.json(projectsWithTranslation);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tags, translations } = body;

    // Create the project
    const project = await prisma.project.create({
      data: {
        tags
      }
    });

    // Create translations for each language
    if (translations && Array.isArray(translations)) {
      for (const t of translations) {
        await prisma.projectTranslation.create({
          data: {
            projectId: project.id,
            title: t.title,
            description: t.description,
            repoUrl: t.repoUrl,
            liveUrl: t.liveUrl,
            language: t.language
          }
        });
      }
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}