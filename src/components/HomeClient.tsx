"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Terminal } from "./magicui/terminal";
import { NumberTicker } from "./magicui/number-ticker";
import { Marquee } from "./magicui/marquee";
import { Particles } from "./magicui/particles";
import { BentoGrid, BentoCard } from "./magicui/bento-grid";
import {
  Monitor,
  Server,
  Cloud,
  GitBranch,
  Container,
  Shield,
  ArrowRight,
  Terminal as TerminalIcon,
  Cpu,
  Database,
  Globe,
  Layers,
  Code2,
  Rocket,
} from "lucide-react";

const terminalLines = [
  { text: "kubectl get nodes", type: "command" as const, delay: 500 },
  { text: "NAME            STATUS   ROLES    AGE   VERSION", type: "output" as const },
  { text: "master-node     Ready    master   42d   v1.28.0", type: "output" as const },
  { text: "worker-node-1   Ready    worker   42d   v1.28.0", type: "output" as const },
  { text: "worker-node-2   Ready    worker   42d   v1.28.0", type: "output" as const },
  { text: "docker build -t portfolio:latest .", type: "command" as const, delay: 800 },
  { text: "[+] Building 12.3s (14/14) FINISHED", type: "success" as const },
  { text: "=> exporting to image                          0.1s", type: "output" as const },
  { text: "helm upgrade --install portfolio ./charts", type: "command" as const, delay: 600 },
  { text: "Release \"portfolio\" has been upgraded. Happy Helming!", type: "success" as const },
  { text: "All systems operational.", type: "info" as const },
];

const techStack = [
  { name: "Kubernetes", icon: Container },
  { name: "Docker", icon: Layers },
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Code2 },
  { name: "React", icon: Monitor },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Linux", icon: TerminalIcon },
  { name: "CI/CD", icon: GitBranch },
  { name: "Cloud", icon: Cloud },
  { name: "Security", icon: Shield },
  { name: "Monitoring", icon: Cpu },
];

export default function HomeClient() {
  const { t, language } = useLanguage();
  const [siteInfo, setSiteInfo] = useState({
    homeTitle: "",
    homeTitleFr: "",
    homeDescription: "",
    homeDescriptionFr: "",
    homeStack: "",
    homeStackFr: "",
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/info")
      .then((res) => res.json())
      .then((data) => {
        setSiteInfo({
          homeTitle: data.homeTitle || "",
          homeTitleFr: data.homeTitleFr || "",
          homeDescription: data.homeDescription || "",
          homeDescriptionFr: data.homeDescriptionFr || "",
          homeStack: data.homeStack || "",
          homeStackFr: data.homeStackFr || "",
        });
      })
      .catch(() => {});

    fetch(`/api/projects?lang=${language}`)
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => {});
  }, [language]);

  const title =
    language === "fr"
      ? siteInfo.homeTitleFr || t("home.title")
      : siteInfo.homeTitle || t("home.title");
  const description =
    language === "fr"
      ? siteInfo.homeDescriptionFr || t("home.subtitle")
      : siteInfo.homeDescription || t("home.subtitle");

  return (
    <div className="min-h-screen relative">
      <Particles
        className="z-0"
        quantity={40}
        color="#f0a04b"
        size={1}
        speed={0.5}
        opacity={0.3}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6 animate-fade-in">
              <div className="section-badge">
                <Rocket className="w-3.5 h-3.5" />
                <span>{language === "fr" ? "Infrastructure & D\u00e9veloppement" : "Infrastructure & Development"}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="gradient-text">Nathan</span>
                <br />
                <span className="gradient-text-orange">Roos</span>
              </h1>

              <h2 className="text-xl sm:text-2xl text-gray-400 font-light">
                <span className="font-mono text-primary-500 text-lg">&lt;</span>
                <span className="text-white font-medium">{title}</span>
                <span className="font-mono text-primary-500 text-lg">/&gt;</span>
              </h2>

              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/projects" className="neon-button">
                  {t("home.exploreProjects")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-outline">
                  {t("home.getInTouch")}
                </Link>
              </div>
            </div>

            {/* Right: Terminal */}
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Terminal
                lines={terminalLines}
                title="nathan@homelab:~"
                typingSpeed={25}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: language === "fr" ? "Disponibilit\u00e9" : "Uptime",
                value: 99.9,
                suffix: "%",
                icon: Shield,
              },
              {
                label: language === "fr" ? "Conteneurs" : "Containers",
                value: 25,
                suffix: "+",
                icon: Container,
              },
              {
                label: language === "fr" ? "Projets" : "Projects",
                value: 12,
                suffix: "+",
                icon: Code2,
              },
              {
                label: language === "fr" ? "Pipelines CI/CD" : "CI/CD Pipelines",
                value: 8,
                suffix: "+",
                icon: GitBranch,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-card p-6 text-center group"
              >
                <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white mb-1">
                  <NumberTicker value={stat.value} delay={0.3 + i * 0.15} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH MARQUEE ===== */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h3 className="text-sm font-mono text-primary-500 uppercase tracking-widest mb-2">
              {t("home.techArsenal")}
            </h3>
          </div>
          <Marquee pauseOnHover speed={30}>
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-300 mx-2"
              >
                <tech.icon className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium text-gray-300 whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ===== QUICK LINKS BENTO ===== */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="section-header">
            <div className="section-badge mx-auto">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === "fr" ? "Explorer" : "Explore"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text mt-4">
              {language === "fr" ? "Navigation Rapide" : "Quick Navigation"}
            </h2>
          </div>

          <BentoGrid className="lg:grid-cols-3">
            <BentoCard className="lg:col-span-2">
              <Link href="/about" className="block h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
                    <Server className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {language === "fr" ? "\u00C0 Propos" : "About Me"}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {language === "fr"
                        ? "Exp\u00e9rience, comp\u00e9tences, \u00e9ducation et parcours professionnel complet."
                        : "Experience, skills, education, and complete professional journey."}
                    </p>
                    <div className="flex items-center gap-2 text-primary-500 text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                      {language === "fr" ? "D\u00e9couvrir" : "Discover"}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </BentoCard>

            <BentoCard>
              <Link href="/projects" className="block h-full">
                <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 w-fit mb-4">
                  <Code2 className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t("nav.projects")}
                </h3>
                <p className="text-gray-400 text-sm">
                  {language === "fr"
                    ? "Applications et solutions d'infrastructure."
                    : "Applications and infrastructure solutions."}
                </p>
                <div className="flex items-center gap-2 text-primary-500 text-sm font-medium mt-4">
                  {language === "fr" ? "Voir" : "View"}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </BentoCard>

            <BentoCard>
              <Link href="/contact" className="block h-full">
                <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 w-fit mb-4">
                  <Globe className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t("nav.contact")}
                </h3>
                <p className="text-gray-400 text-sm">
                  {language === "fr"
                    ? "Discutons de votre prochain projet."
                    : "Let's discuss your next project."}
                </p>
                <div className="flex items-center gap-2 text-primary-500 text-sm font-medium mt-4">
                  {language === "fr" ? "Contact" : "Reach out"}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </BentoCard>

            <BentoCard className="lg:col-span-2">
              <Link href="/contact#testimonials" className="block h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
                    <Shield className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {t("nav.testimonials")}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {language === "fr"
                        ? "Retours authentiques de clients et collaborateurs."
                        : "Authentic feedback from clients and collaborators."}
                    </p>
                    <div className="flex items-center gap-2 text-primary-500 text-sm font-medium mt-4">
                      {language === "fr" ? "Lire" : "Read"}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>
    </div>
  );
}
