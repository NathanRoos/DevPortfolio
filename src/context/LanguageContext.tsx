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
        // ...add more keys as needed
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
        // ...add more keys as needed
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
