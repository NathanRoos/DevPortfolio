export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    // Update main education fields
    const updatedEducation = await prisma.education.update({
      where: { id },
      data: {
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
      },
    });
    // Update translations
    await Promise.all([
      prisma.educationTranslation.updateMany({
        where: { educationId: id, language: 'en' },
        data: {
          degree: body.en.degree,
          institution: body.en.institution,
          description: body.en.description,
        },
      }),
      prisma.educationTranslation.updateMany({
        where: { educationId: id, language: 'fr' },
        data: {
          degree: body.fr.degree,
          institution: body.fr.institution,
          description: body.fr.description,
        },
      })
    ]);
    return NextResponse.json({ message: 'Education updated successfully' });
  } catch (error) {
    console.error('Error updating education:', error);
    return NextResponse.json(
      { error: 'Failed to update education' },
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
    
    await prisma.education.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 }
    );
  }
}
