// Simple in-memory database for demo
class Database {
  constructor() {
    this.data = {
      skills: [
        { id: 1, name: 'Next.js', category: 'Frontend', proficiency: 90 },
        { id: 2, name: 'TypeScript', category: 'Frontend', proficiency: 85 },
        { id: 3, name: 'React', category: 'Frontend', proficiency: 92 },
        { id: 4, name: 'PostgreSQL', category: 'Database', proficiency: 80 },
        { id: 5, name: 'Kubernetes', category: 'DevOps', proficiency: 75 },
        { id: 6, name: 'Docker', category: 'DevOps', proficiency: 88 },
        { id: 7, name: 'Go', category: 'Backend', proficiency: 78 },
        { id: 8, name: 'AWS', category: 'Cloud', proficiency: 82 },
      ],
      projects: [
        {
          id: 1,
          title: 'Kleff Hosting Platform',
          description: 'Open-source Canadian hosting platform with one-click Docker Compose deployments, GitHub-style collaboration, and comprehensive observability tools.',
          technologies: 'Next.js, Go, Kubernetes, PostgreSQL',
          url: 'https://github.com/kleffio',
        },
        {
          id: 2,
          title: 'Cloud Infrastructure Deployment',
          description: 'Automated microservices deployment to AWS EKS using Terraform with monitoring, logging, and auto-scaling capabilities.',
          technologies: 'AWS, Kubernetes, Terraform, Prometheus',
          url: '#',
        },
      ],
      experience: [
        {
          id: 1,
          company: 'City of LaSalle',
          position: 'Lifeguard',
          startDate: '2020-05',
          endDate: '2024-08',
          description: 'Ensured safety of pool patrons through vigilant surveillance and emergency response. Trained in first aid, CPR, and water rescue techniques. Maintained pool operations and assisted with swim lessons for various age groups.',
        },
        {
          id: 2,
          company: 'Tech Innovations Inc.',
          position: 'Full Stack Developer Intern',
          startDate: '2023-06',
          endDate: 'Present',
          description: 'Developing scalable cloud-native applications using Next.js and Kubernetes. Led migration of legacy systems to microservices architecture. Collaborated with senior developers on Kleff hosting platform.',
        },
      ],
      education: [
        {
          id: 1,
          institution: 'Champlain College Saint-Lambert',
          degree: 'DEC in Computer Science',
          startDate: '2022-08',
          endDate: '2025-05',
          description: 'Specialized in software development, cloud infrastructure, and DevOps practices. Dean\'s List recognition.',
        },
      ],
      hobbies: [
        { id: 1, name: 'Open Source Contribution', description: 'Active contributor to cloud-native projects and developer tools' },
        { id: 2, name: 'Cloud Architecture', description: 'Building and experimenting with scalable distributed systems' },
        { id: 3, name: 'Tech Blogging', description: 'Writing about DevOps, Kubernetes, and modern web development' },
      ],
      contact: {
        email: 'nathan.roos@example.com',
        github: 'https://github.com/nathanroos',
        linkedin: 'https://linkedin.com/in/nathanroos',
      },
      messages: [],
      testimonials: [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          message: 'Nathan is an exceptional developer with deep knowledge of cloud infrastructure. His work on Kleff demonstrates his ability to build production-grade systems.',
          approved: true,
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  async getSkills() { return this.data.skills; }
  async addSkill(skill) {
    const newSkill = { id: Date.now(), ...skill };
    this.data.skills.push(newSkill);
    return newSkill;
  }
  async updateSkill(id, skill) {
    const index = this.data.skills.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
      this.data.skills[index] = { ...this.data.skills[index], ...skill };
      return this.data.skills[index];
    }
    return null;
  }
  async deleteSkill(id) {
    this.data.skills = this.data.skills.filter(s => s.id !== parseInt(id));
    return true;
  }

  async getProjects() { return this.data.projects; }
  async addProject(project) {
    const newProject = { id: Date.now(), ...project };
    this.data.projects.push(newProject);
    return newProject;
  }
  async updateProject(id, project) {
    const index = this.data.projects.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      this.data.projects[index] = { ...this.data.projects[index], ...project };
      return this.data.projects[index];
    }
    return null;
  }
  async deleteProject(id) {
    this.data.projects = this.data.projects.filter(p => p.id !== parseInt(id));
    return true;
  }

  async getExperience() { return this.data.experience; }
  async addExperience(exp) {
    const newExp = { id: Date.now(), ...exp };
    this.data.experience.push(newExp);
    return newExp;
  }
  async updateExperience(id, exp) {
    const index = this.data.experience.findIndex(e => e.id === parseInt(id));
    if (index !== -1) {
      this.data.experience[index] = { ...this.data.experience[index], ...exp };
      return this.data.experience[index];
    }
    return null;
  }
  async deleteExperience(id) {
    this.data.experience = this.data.experience.filter(e => e.id !== parseInt(id));
    return true;
  }

  async getEducation() { return this.data.education; }
  async addEducation(edu) {
    const newEdu = { id: Date.now(), ...edu };
    this.data.education.push(newEdu);
    return newEdu;
  }
  async updateEducation(id, edu) {
    const index = this.data.education.findIndex(e => e.id === parseInt(id));
    if (index !== -1) {
      this.data.education[index] = { ...this.data.education[index], ...edu };
      return this.data.education[index];
    }
    return null;
  }
  async deleteEducation(id) {
    this.data.education = this.data.education.filter(e => e.id !== parseInt(id));
    return true;
  }

  async getHobbies() { return this.data.hobbies; }
  async addHobby(hobby) {
    const newHobby = { id: Date.now(), ...hobby };
    this.data.hobbies.push(newHobby);
    return newHobby;
  }
  async updateHobby(id, hobby) {
    const index = this.data.hobbies.findIndex(h => h.id === parseInt(id));
    if (index !== -1) {
      this.data.hobbies[index] = { ...this.data.hobbies[index], ...hobby };
      return this.data.hobbies[index];
    }
    return null;
  }
  async deleteHobby(id) {
    this.data.hobbies = this.data.hobbies.filter(h => h.id !== parseInt(id));
    return true;
  }

  async getContact() { return this.data.contact; }
  async updateContact(contact) {
    this.data.contact = { ...this.data.contact, ...contact };
    return this.data.contact;
  }

  async getMessages() { return this.data.messages; }
  async addMessage(message) {
    const newMessage = { 
      id: Date.now(), 
      ...message,
      createdAt: new Date().toISOString() 
    };
    this.data.messages.push(newMessage);
    return newMessage;
  }
  async deleteMessage(id) {
    this.data.messages = this.data.messages.filter(m => m.id !== parseInt(id));
    return true;
  }

  async getTestimonials(includeUnapproved = false) {
    if (includeUnapproved) return this.data.testimonials;
    return this.data.testimonials.filter(t => t.approved);
  }
  async addTestimonial(testimonial) {
    const newTestimonial = {
      id: Date.now(),
      ...testimonial,
      approved: false,
      createdAt: new Date().toISOString(),
    };
    this.data.testimonials.push(newTestimonial);
    return newTestimonial;
  }
  async approveTestimonial(id) {
    const index = this.data.testimonials.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
      this.data.testimonials[index].approved = true;
      return this.data.testimonials[index];
    }
    return null;
  }
  async deleteTestimonial(id) {
    this.data.testimonials = this.data.testimonials.filter(t => t.id !== parseInt(id));
    return true;
  }
}

let dbInstance = null;

export function getDb() {
  if (!dbInstance) {
    dbInstance = new Database();
  }
  return dbInstance;
}
