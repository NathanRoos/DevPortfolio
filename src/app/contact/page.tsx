"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import ContactForm from "../../components/ContactForm";
import TestimonialCard from "../../components/TestimonialCard";
import { Particles } from "../../components/magicui/particles";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Star,
  FileText,
  Download,
} from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  createdAt: string;
  user: { name: string };
}

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [siteInfo, setSiteInfo] = useState({ contactEmail: "", helpInfo: "", helpInfoFr: "" });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({ author: "", text: "", rating: 5, website: "" });
  const [submittingTestimonial, setSubmittingTestimonial] = useState(false);
  const [testimonialSuccess, setTestimonialSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/info")
      .then((r) => r.json())
      .then((data) =>
        setSiteInfo({
          contactEmail: data.contactEmail || "",
          helpInfo: data.helpInfo || "",
          helpInfoFr: data.helpInfoFr || "",
        })
      )
      .catch(() => {});

    fetch("/api/testimonials")
      .then((r) => (r.ok ? r.json() : []))
      .then(setTestimonials)
      .catch(() => {});
  }, []);

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (testimonialForm.text.trim().length < 10) {
      alert(language === "fr" ? "Veuillez \u00e9crire au moins 10 caract\u00e8res." : "Please write at least 10 characters.");
      return;
    }
    if (testimonialForm.website) { setTestimonialSuccess(true); return; }
    setSubmittingTestimonial(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialForm),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed");
      }
      setTestimonialForm({ author: "", text: "", rating: 5, website: "" });
      setTestimonialSuccess(true);
      setShowTestimonialForm(false);
      setTimeout(() => setTestimonialSuccess(false), 5000);
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setSubmittingTestimonial(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Particles className="z-0" quantity={25} color="#f0a04b" size={1} speed={0.3} opacity={0.2} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge mx-auto">
            <Send className="w-3.5 h-3.5" />
            <span>{t("contact.title")}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mt-4 mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("contact.intro")}</p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-5 gap-8 mb-20">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Cards */}
            {[
              { icon: Mail, title: t("contact.emailTitle"), desc: siteInfo.contactEmail || "nathan@example.com" },
              { icon: MapPin, title: t("contact.locationTitle"), desc: t("contact.locationDesc") },
              { icon: Clock, title: t("contact.responseTitle"), desc: t("contact.responseDesc") },
            ].map((item, i) => (
              <div key={i} className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* What I Can Help With */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-500" />
                {t("contact.helpTitle")}
              </h3>
              <div className="text-gray-400 text-sm whitespace-pre-line leading-relaxed">
                {language === "fr" ? siteInfo.helpInfoFr || siteInfo.helpInfo : siteInfo.helpInfo}
              </div>
            </div>

            {/* CV Download */}
            <a
              href="/api/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 flex items-center gap-4 group hover:border-primary-500/30 cursor-pointer block"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                <Download className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{t("cv.title")}</h3>
                <p className="text-sm text-gray-400">{t("cv.button")}</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="scroll-mt-24">
          <div className="section-header">
            <div className="section-badge mx-auto">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t("testimonials.title")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text mt-4 mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-6">{t("testimonials.intro")}</p>

            {testimonialSuccess && (
              <div className="mb-6 p-4 glass-card rounded-xl max-w-md mx-auto border border-green-500/30">
                <p className="text-green-400 text-sm font-medium">
                  {language === "fr"
                    ? "Merci ! Votre t\u00e9moignage est en attente d'approbation."
                    : "Thank you! Your testimonial is pending approval."}
                </p>
              </div>
            )}

            <button
              onClick={() => setShowTestimonialForm(!showTestimonialForm)}
              className="neon-button px-6 py-3"
            >
              <Star className="w-4 h-4" />
              {showTestimonialForm
                ? t("testimonials.cancel")
                : t("testimonials.button")}
            </button>
          </div>

          {/* Testimonial Form */}
          {showTestimonialForm && (
            <div className="glass-card p-6 sm:p-8 rounded-2xl mb-12 max-w-xl mx-auto animate-slide-up">
              <form onSubmit={handleTestimonialSubmit} className="space-y-5">
                <div style={{ display: "none" }} aria-hidden="true">
                  <input type="text" name="website" autoComplete="off" tabIndex={-1}
                    value={testimonialForm.website}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, website: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">{t("testimonials.author")} *</label>
                  <input
                    type="text"
                    value={testimonialForm.author}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">{t("testimonials.rating")}</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min="1" max="5" step="1"
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                      className="flex-1 accent-primary-500"
                    />
                    <span className="text-lg font-bold text-primary-400 w-10 text-center">{testimonialForm.rating} <Star className="w-3.5 h-3.5 inline" /></span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">{t("testimonials.textLabel")} *</label>
                  <textarea
                    value={testimonialForm.text}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                    rows={4}
                    className="w-full resize-none"
                    placeholder={t("testimonials.textPlaceholder")}
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={submittingTestimonial} className="neon-button flex-1 py-3 disabled:opacity-50">
                    {submittingTestimonial ? t("testimonials.submitting") : t("testimonials.submitButton")}
                  </button>
                  <button type="button" onClick={() => setShowTestimonialForm(false)}
                    className="px-5 py-3 text-gray-400 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                    {t("testimonials.cancel")}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Testimonials Grid */}
          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <MessageSquare className="w-10 h-10 text-primary-500/40 mx-auto mb-3" />
              <p className="text-gray-500">{t("testimonials.empty")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
