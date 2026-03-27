"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Particles } from "../../components/magicui/particles";
import {
  Briefcase,
  GraduationCap,
  Cpu,
  Heart,
  MapPin,
  Calendar,
  Building2,
  ChevronRight,
} from "lucide-react";

export default function AboutPage() {
  const { t, language } = useLanguage();
  const [skills, setSkills] = useState<any[]>([]);
  const [skillsByCategory, setSkillsByCategory] = useState<Record<string, any[]>>({});
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"experience" | "education" | "skills" | "hobbies">("experience");

  useEffect(() => {
    Promise.all([
      fetch("/api/skills").then((r) => r.ok ? r.json() : []),
      fetch("/api/experience").then((r) => r.ok ? r.json() : []),
      fetch("/api/education").then((r) => r.ok ? r.json() : []),
      fetch("/api/hobbies").then((r) => r.ok ? r.json() : []),
    ]).then(([fetchedSkills, exp, edu, hob]) => {
      setSkills(fetchedSkills);
      setExperiences(exp);
      setEducation(edu);
      setHobbies(hob);

      const grouped: Record<string, any[]> = {};
      fetchedSkills.forEach((skill: any) => {
        if (!grouped[skill.category]) grouped[skill.category] = [];
        grouped[skill.category].push(skill);
      });
      setSkillsByCategory(grouped);
    });
  }, []);

  const tabs = [
    { id: "experience" as const, label: t("nav.experience"), icon: Briefcase, count: experiences.length },
    { id: "education" as const, label: t("nav.education"), icon: GraduationCap, count: education.length },
    { id: "skills" as const, label: t("nav.skills"), icon: Cpu, count: skills.length },
    { id: "hobbies" as const, label: t("nav.hobbies"), icon: Heart, count: hobbies.length },
  ];

  return (
    <div className="min-h-screen relative">
      <Particles className="z-0" quantity={30} color="#f0a04b" size={1} speed={0.3} opacity={0.2} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge mx-auto">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{language === "fr" ? "\u00C0 propos" : "About"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mt-4 mb-4">
            {language === "fr" ? "\u00C0 Propos de Moi" : "About Me"}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === "fr"
              ? "Mon parcours professionnel, mes comp\u00e9tences techniques et ce qui me passionne."
              : "My professional journey, technical skills, and what drives me."}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary-500/15 text-primary-400 border border-primary-500/30"
                  : "text-gray-500 hover:text-gray-300 border border-transparent hover:border-white/10"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                  activeTab === tab.id ? "bg-primary-500/20 text-primary-400" : "bg-white/5 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-6 animate-fade-in">
            {experiences.length === 0 ? (
              <div className="glass-card p-12 text-center text-gray-500">{t("experience.empty")}</div>
            ) : (
              experiences.map((exp, index) => {
                const translation = exp.translations?.find((tr: any) => tr.language === language);
                return (
                  <div key={exp.id} className="glass-card p-6 sm:p-8 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary-500" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {translation?.position || <span className="italic text-gray-500">—</span>}
                            </h3>
                            <p className="text-primary-400 font-medium">
                              {translation?.company || <span className="italic text-gray-500">—</span>}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500 font-mono flex-shrink-0">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(exp.startDate).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                              {" — "}
                              {exp.endDate
                                ? new Date(exp.endDate).toLocaleDateString(undefined, { month: "short", year: "numeric" })
                                : language === "fr" ? "Pr\u00e9sent" : "Present"}
                            </span>
                            {exp.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>
                        {translation?.description && (
                          <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm">{translation.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {education.length === 0 ? (
              <div className="col-span-full glass-card p-12 text-center text-gray-500">{t("education.empty")}</div>
            ) : (
              education.map((edu, index) => {
                const translation = edu.translations?.find((tr: any) => tr.language === language);
                return (
                  <div key={edu.id} className="glass-card p-6 sm:p-8 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary-500" />
                      </div>
                      <span className="text-xs font-mono text-primary-500 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
                        {new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : language === "fr" ? "Pr\u00e9sent" : "Present"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {translation?.degree || <span className="italic text-gray-500">—</span>}
                    </h3>
                    <p className="text-primary-400 font-medium mb-3">
                      {translation?.institution || <span className="italic text-gray-500">—</span>}
                    </p>
                    {translation?.description && (
                      <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">{translation.description}</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-8 animate-fade-in">
            {Object.keys(skillsByCategory).length === 0 ? (
              <div className="glass-card p-12 text-center text-gray-500">{t("skills.empty")}</div>
            ) : (
              Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="glass-card p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-primary-500" />
                    {category}
                    <span className="text-xs font-mono text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">{categorySkills.length}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map((skill) => {
                      const translation = skill.translations?.find((tr: any) => tr.language === language);
                      return (
                        <div key={skill.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-primary-500/20 transition-all">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-white text-sm">
                              {translation?.name || <span className="italic text-gray-500">—</span>}
                            </span>
                            <span className="text-xs font-mono text-primary-500">{skill.proficiency}%</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${skill.proficiency}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Hobbies Tab */}
        {activeTab === "hobbies" && (
          <div className="animate-fade-in">
            {hobbies.length === 0 ? (
              <div className="glass-card p-12 text-center text-gray-500">{t("hobbies.empty")}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {hobbies.map((hobby, index) => {
                  const isUrl = typeof hobby.icon === "string" && hobby.icon.startsWith("http");
                  const hobbyName = language === "fr" ? hobby.nameFr || hobby.name : hobby.name;
                  return (
                    <div
                      key={hobby.id}
                      className="glass-card group overflow-hidden animate-scale-in hover:border-primary-500/20"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {isUrl ? (
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={hobby.icon}
                            alt={hobbyName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h4 className="text-lg font-semibold text-white">{hobbyName}</h4>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-primary-500/10 border border-primary-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/15 transition-colors">
                            <span className="text-2xl group-hover:scale-110 transition-transform duration-300 block">
                              {hobby.icon || "\u2728"}
                            </span>
                          </div>
                          <h4 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                            {hobbyName}
                          </h4>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
