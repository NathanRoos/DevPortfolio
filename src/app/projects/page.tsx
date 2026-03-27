"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { Particles } from "../../components/magicui/particles";
import {
  Code2,
  ExternalLink,
  GitBranch,
  Rocket,
  Filter,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  tags: string[];
  image?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  language: string;
}

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    fetch(`/api/projects?lang=${language}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [language]);

  // Extract unique tags for filtering
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Particles className="z-0" quantity={25} color="#f0a04b" size={1} speed={0.3} opacity={0.2} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge mx-auto">
            <Code2 className="w-3.5 h-3.5" />
            <span>{t("projects.title")}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mt-4 mb-4">
            {t("projects.title")}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("projects.intro")}
          </p>
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === "all"
                  ? "bg-primary-500/15 text-primary-400 border border-primary-500/30"
                  : "text-gray-500 hover:text-gray-300 border border-white/5 hover:border-white/10"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              {language === "fr" ? "Tous" : "All"}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === tag
                    ? "bg-primary-500/15 text-primary-400 border border-primary-500/30"
                    : "text-gray-500 hover:text-gray-300 border border-white/5 hover:border-white/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Rocket className="w-12 h-12 text-primary-500/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{t("projects.comingSoon")}</h3>
            <p className="text-gray-500">{t("projects.empty")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <div
                key={project.id}
                className="glass-card group overflow-hidden animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Image */}
                {project.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
                  </div>
                )}

                <div className="p-6 flex flex-col h-full" style={{ minHeight: project.image ? "auto" : "280px" }}>
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-xs font-mono text-primary-400 bg-primary-500/8 border border-primary-500/15 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                    {project.repoUrl && (
                      <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 rounded-lg transition-all"
                      >
                        <GitBranch className="w-4 h-4" />
                        Code
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-950 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-lg transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
