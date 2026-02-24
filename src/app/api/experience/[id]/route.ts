import { experienceSchema } from '../../../../lib/validators';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    // Validate data
    const validatedData = experienceSchema.parse(body);
    // Update main experience fields
    const updatedExperience = await prisma.experience.update({
      where: { id },
      data: {
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        location: validatedData.location,
      },
    });
    // Update translations
    await Promise.all([
      prisma.experienceTranslation.updateMany({
        where: { experienceId: id, language: 'en' },
        data: {
          position: validatedData.en.position,
          company: validatedData.en.company,
          description: validatedData.en.description,
        },
      }),
      prisma.experienceTranslation.updateMany({
        where: { experienceId: id, language: 'fr' },
        data: {
          position: validatedData.fr.position,
          company: validatedData.fr.company,
          description: validatedData.fr.description,
        },
      })
    ]);
    return NextResponse.json({ message: 'Experience updated successfully' });
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.experience.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}
