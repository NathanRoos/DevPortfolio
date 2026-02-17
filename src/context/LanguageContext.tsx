"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define available languages
export type Language = "en" | "fr";

// 2. Define the dictionary of words
const translations = {
    en: {
        "nav.home": "Home",
        "nav.projects": "Projects",
        "nav.skills": "Skills",
        "nav.experience": "Experience",
        "nav.education": "Education",
        "nav.hobbies": "Hobbies",
        "nav.cv": "CV",
        "nav.testimonials": "Testimonials",
        "nav.contact": "Contact",
        "hero.greeting": "Welcome!",
        // Homepage keys
        // Admin Dashboard keys
        "admin.dashboard.welcome": "Welcome Back",
        "admin.dashboard.manage": "Manage your portfolio content and view analytics",
        "admin.dashboard.features": "• Real-time Data • Modern Interface",
        "admin.dashboard.totalProjects": "Total Projects",
        "admin.dashboard.totalTestimonials": "Total Testimonials",
        "admin.dashboard.totalMessages": "Total Messages",
        "admin.dashboard.pendingTestimonials": "Pending Testimonials",
        // Admin Education keys
        "admin.education.title": "Education",
        "admin.education.subtitle": "Academic background and certifications",
        "admin.education.addTitle": "Add Education",
        "admin.education.degreePlaceholder": "Degree / Certificate",
        "admin.education.institutionPlaceholder": "Institution",
        "admin.education.startDate": "Start Date",
        "admin.education.endDate": "End Date",
        "admin.education.descriptionPlaceholder": "Description (Optional)",
        "admin.education.addButton": "Add Education",
        "admin.education.present": "Present",
        "admin.education.empty": "No education added yet.",
        "home.name": "Nathan Roos",
        "home.title": "Full Stack Developer & DevOps Developer",
        "home.subtitle": "Crafting scalable applications with cutting-edge technologies.",
        "home.stack": "Next.js • Kubernetes • Modern Cloud Infrastructure",
        "home.exploreProjects": "Explore Projects",
        "home.getInTouch": "Get In Touch",
        "home.projects": "Projects",
        "home.projectsDesc": "Explore cutting-edge applications and technical implementations",
        "home.cv": "CV",
        "home.cvDesc": "Download my latest Curriculum Vitae (CV)",
        "home.testimonials": "Testimonials",
        "home.testimonialsDesc": "Read authentic feedback from clients and collaborators",
        "home.contact": "Contact",
        "home.contactDesc": "Let's collaborate on your next innovative project",
        "home.architecture": "Architecture",
        "home.architectureDesc": "View live cluster topology and infrastructure",
        "home.techArsenal": "Technology Arsenal",
    },
    fr: {
        "nav.home": "Accueil",
        "nav.projects": "Projets",
        "nav.skills": "Compétences",
        "nav.experience": "Expérience",
        "nav.education": "Éducation",
        "nav.hobbies": "Loisirs",
        "nav.cv": "CV",
        "nav.testimonials": "Témoignages",
        "nav.contact": "Contact",
        "hero.greeting": "Bienvenue!",
        // Homepage keys
        // Admin Dashboard keys
        "admin.dashboard.welcome": "Bon retour !",
        "admin.dashboard.manage": "Gérez le contenu de votre portfolio et consultez les analyses",
        "admin.dashboard.features": "• Données en temps réel • Interface moderne",
        "admin.dashboard.totalProjects": "Projets totaux",
        "admin.dashboard.totalTestimonials": "Témoignages totaux",
        "admin.dashboard.totalMessages": "Messages totaux",
        "admin.dashboard.pendingTestimonials": "Témoignages en attente",
        // Admin Education keys
        "admin.education.title": "Éducation",
        "admin.education.subtitle": "Parcours académique et certifications",
        "admin.education.addTitle": "Ajouter une formation",
        "admin.education.degreePlaceholder": "Diplôme / Certificat",
        "admin.education.institutionPlaceholder": "Établissement",
        "admin.education.startDate": "Date de début",
        "admin.education.endDate": "Date de fin",
        "admin.education.descriptionPlaceholder": "Description (optionnelle)",
        "admin.education.addButton": "Ajouter",
        "admin.education.present": "En cours",
        "admin.education.empty": "Aucune formation ajoutée pour le moment.",
        "home.name": "Nathan Roos",
        "home.title": "Développeur Full Stack & DevOps",
        "home.subtitle": "Créer des applications évolutives avec des technologies de pointe.",
        "home.stack": "Next.js • Kubernetes • Infrastructure Cloud Moderne",
        "home.exploreProjects": "Voir les Projets",
        "home.getInTouch": "Contactez-moi",
        "home.projects": "Projets",
        "home.projectsDesc": "Découvrez des applications innovantes et des implémentations techniques",
        "home.cv": "CV",
        "home.cvDesc": "Téléchargez mon dernier Curriculum Vitae (CV)",
        "home.testimonials": "Témoignages",
        "home.testimonialsDesc": "Lisez les retours authentiques de clients et collaborateurs",
        "home.contact": "Contact",
        "home.contactDesc": "Collaborons sur votre prochain projet innovant",
        "home.architecture": "Architecture",
        "home.architectureDesc": "Voir la topologie du cluster et l'infrastructure en direct",
        "home.techArsenal": "Arsenal Technologique",
    }
};

// 3. Create the Context
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 4. Create the Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    // The magic translation function
    const t = (key: string) => {
        return translations[language][key as keyof typeof translations["en"]] || key;
    };
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// 5. Create a custom hook for easy usage
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
}
