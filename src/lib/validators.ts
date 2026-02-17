import { z } from 'zod';

export const testimonialSchema = z.object({
  author: z.string().min(1, 'Author name is required').max(100),
  text: z.string().trim().min(10, 'Please write at least 10 characters for your testimonial so we can hear your full story!').max(1000),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').default(5),
});

export const contactMessageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be at most 1000 characters')
    .refine(
      (val) => val.trim().split(/\s+/).filter(Boolean).length >= 5,
      {
        message: 'Message must contain at least 5 words.',
      }
    ),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(2000),
  repoUrl: z.string().url('Invalid repository URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Invalid live URL').optional().or(z.literal('')),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
});

export const testimonialStatusSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'PENDING']),
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  proficiency: z.number().min(0).max(100).default(0),
  icon: z.string().optional(),
});

export const experienceSchema = z.object({
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z.string().or(z.date()), // Accept string from JSON, convert later if needed
  endDate: z.string().or(z.date()).nullable().optional(),
  description: z.string().min(1, 'Description is required'),
  location: z.string().optional(),
});

export const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).nullable().optional(),
  description: z.string().optional(),
});

export const hobbySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().optional(),
});