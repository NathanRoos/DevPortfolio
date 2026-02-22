import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { contactMessageSchema } from '../../../lib/validators';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : { emails: { send: async () => console.warn('Resend API Key missing') } } as unknown as Resend;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactMessageSchema.parse(body);
    
    // Save to database first
    let savedMessage;
    try {
      savedMessage = await prisma.contactMessage.create({
        data: {
          userId: null, // No user auth for now
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message,
        },
      });
    } catch (dbError) {
      console.log('Database not available, continuing with email sending:', validatedData);
    }

    // Send email notification
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // Free Resend sender for testing
        to: [process.env.CONTACT_EMAIL || 'nathan.w.roos@gmail.com'],
        subject: `New Contact Form Message from ${validatedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${validatedData.message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>Sent from your portfolio contact form</small></p>
        `,
        text: `
New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}

---
Sent from your portfolio contact form
        `
      });

      return NextResponse.json({ 
        message: 'Message sent successfully and email delivered!', 
        id: savedMessage?.id 
      }, { status: 201 });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Still return success if database save worked, even if email failed
      return NextResponse.json({ 
        message: 'Message saved successfully, but email delivery failed. You will see it in the admin dashboard.', 
        id: savedMessage?.id 
      }, { status: 201 });
    }
    
  } catch (error) {
    // Zod validation error
    if (error && typeof error === 'object' && 'issues' in error && Array.isArray((error as any).issues)) {
      // Map Zod issues to a clean array of messages
      const issues = (error as any).issues.map((i: any) => ({ message: i.message }));
      return NextResponse.json({ error: 'Validation failed', issues }, { status: 400 });
    }
    console.error('Error creating contact message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}