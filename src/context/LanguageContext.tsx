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
