import { User, Project, Testimonial, ContactMessage, Role, TestimonialStatus } from '@prisma/client';

export type { User, Project, Testimonial, ContactMessage, Role, TestimonialStatus };

export interface UserSession extends User {
  // Add any additional session-specific properties if needed
}

export interface ProjectWithTags extends Project {
  tags: string[];
}

export interface TestimonialWithUser extends Testimonial {
  user: User;
}

export interface ContactMessageWithUser extends ContactMessage {
  user?: User | null;
}