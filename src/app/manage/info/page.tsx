"use client";

import { useState, useEffect } from "react";
import ManageGuard from "../../../components/AdminGuard";
import { useLanguage } from '../../../context/LanguageContext';

export default function ManageInfoPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    contactEmail: "",
    helpInfo: "",
    helpInfoFr: "",
    directEmail: "",
    homeTitle: "",
    homeTitleFr: "",
    homeDescription: "",
    homeDescriptionFr: "",
    homeStack: "",
    homeStackFr: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({
    contactEmail: false,
    helpInfo: false,
    helpInfoFr: false,
    directEmail: false,
    homeTitle: false,
    homeTitleFr: false,
    homeDescription: false,
    homeDescriptionFr: false,
    homeStack: false,
    homeStackFr: false
  });
  const [message, setMessage] = useState({
    contactEmail: "",
    helpInfo: "",
    helpInfoFr: "",
    directEmail: "",
    homeTitle: "",
    homeTitleFr: "",
    homeDescription: "",
    homeDescriptionFr: "",
    homeStack: "",
    homeStackFr: ""
  });

  useEffect(() => {
    fetch("/api/info")
      .then(res => res.json())
      .then(data => {
        setForm({
          contactEmail: data.contactEmail || "",
          helpInfo: data.helpInfo || "",
          directEmail: data.directEmail || "",
          homeTitle: data.homeTitle || "Full Stack Developer & DevOps Developer",
          homeTitleFr: data.homeTitleFr || "Développeur Full Stack & DevOps",
          homeDescription: data.homeDescription || "Crafting scalable applications with cutting-edge technologies.",
          homeDescriptionFr: data.homeDescriptionFr || "Création d'applications évolutives avec des technologies de pointe.",
          homeStack: data.homeStack || "Next.js • Kubernetes • Modern Cloud Infrastructure",
          homeStackFr: data.homeStackFr || "Next.js • Kubernetes • Infrastructure Cloud Moderne"
        });
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (field) => {
    setSaving(s => ({ ...s, [field]: true }));
    setMessage(m => ({ ...m, [field]: "" }));
    const res = await fetch("/api/info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, [field]: form[field] })
    });
    if (res.ok) {
      setMessage(m => ({ ...m, [field]: "Saved!" }));
    } else {
      setMessage(m => ({ ...m, [field]: "Failed to save." }));
    }
    setSaving(s => ({ ...s, [field]: false }));
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <ManageGuard>
      <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-8">{t('dashboard.siteinfo.title')}</h1>
        <div className="space-y-8">
          <div>
            <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.homeTitle')}</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="homeTitle"
                value={form.homeTitle}
                onChange={handleChange}
                className="input w-full font-bold"
                required
              />
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving.homeTitle}
                onClick={() => handleSave("homeTitle")}
              >
                {saving.homeTitle ? "Saving..." : "Save"}
              </button>
              <span className="text-green-500 ml-2">{message.homeTitle}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{t('dashboard.siteinfo.homeTitleHelp')}</p>
            <div className="mt-4">
              <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.homeTitle')} (FR)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="homeTitleFr"
                  value={form.homeTitleFr}
                  onChange={handleChange}
                  className="input w-full font-bold"
                  required
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={saving.homeTitleFr}
                  onClick={() => handleSave("homeTitleFr")}
                >
                  {saving.homeTitleFr ? "Saving..." : "Save"}
                </button>
                <span className="text-green-500 ml-2">{message.homeTitleFr}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.homeStack')}</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="homeStack"
                value={form.homeStack}
                onChange={handleChange}
                className="input w-full font-mono"
                required
              />
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving.homeStack}
                onClick={() => handleSave("homeStack")}
              >
                {saving.homeStack ? "Saving..." : "Save"}
              </button>
              <span className="text-green-500 ml-2">{message.homeStack}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{t('dashboard.siteinfo.homeStackHelp')}</p>
            <div className="mt-4">
              <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.homeStack')} (FR)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="homeStackFr"
                  value={form.homeStackFr}
                  onChange={handleChange}
                  className="input w-full font-mono"
                  required
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={saving.homeStackFr}
                  onClick={() => handleSave("homeStackFr")}
                >
                  {saving.homeStackFr ? "Saving..." : "Save"}
                </button>
                <span className="text-green-500 ml-2">{message.homeStackFr}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.homeDescription')}</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="homeDescription"
                value={form.homeDescription}
                onChange={handleChange}
                className="input w-full"
                required
              />
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving.homeDescription}
                onClick={() => handleSave("homeDescription")}
              >
                {saving.homeDescription ? "Saving..." : "Save"}
              </button>
              <span className="text-green-500 ml-2">{message.homeDescription}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{t('dashboard.siteinfo.homeDescriptionHelp')}</p>
            <div className="mt-4">
              <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.homeDescription')} (FR)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="homeDescriptionFr"
                  value={form.homeDescriptionFr}
                  onChange={handleChange}
                  className="input w-full"
                  required
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={saving.homeDescriptionFr}
                  onClick={() => handleSave("homeDescriptionFr")}
                >
                  {saving.homeDescriptionFr ? "Saving..." : "Save"}
                </button>
                <span className="text-green-500 ml-2">{message.homeDescriptionFr}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.contactEmail')}</label>
            <div className="flex gap-2">
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                className="input w-full"
                required
              />
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving.contactEmail}
                onClick={() => handleSave("contactEmail")}
              >
                {saving.contactEmail ? "Saving..." : "Save"}
              </button>
            </div>
            {message.contactEmail && <div className="mt-1 text-green-400 text-sm">{message.contactEmail}</div>}
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.helpInfo')}</label>
            <div className="flex gap-2">
              <textarea
                name="helpInfo"
                value={form.helpInfo}
                onChange={handleChange}
                className="input w-full"
                rows={3}
                required
              />
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving.helpInfo}
                onClick={() => handleSave("helpInfo")}
              >
                {saving.helpInfo ? "Saving..." : "Save"}
              </button>
            </div>
            {message.helpInfo && <div className="mt-1 text-green-400 text-sm">{message.helpInfo}</div>}
            <div className="mt-4">
              <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.helpInfo')} (FR)</label>
              <div className="flex gap-2">
                <textarea
                  name="helpInfoFr"
                  value={form.helpInfoFr}
                  onChange={handleChange}
                  className="input w-full"
                  rows={3}
                  required
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={saving.helpInfoFr}
                  onClick={() => handleSave("helpInfoFr")}
                >
                  {saving.helpInfoFr ? "Saving..." : "Save"}
                </button>
                <span className="text-green-500 ml-2">{message.helpInfoFr}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">{t('dashboard.siteinfo.directEmail')}</label>
            <div className="flex gap-2">
              <input
                type="email"
                name="directEmail"
                value={form.directEmail}
                onChange={handleChange}
                className="input w-full"
                required
              />
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving.directEmail}
                onClick={() => handleSave("directEmail")}
              >
                {saving.directEmail ? "Saving..." : "Save"}
              </button>
            </div>
            {message.directEmail && <div className="mt-1 text-green-400 text-sm">{message.directEmail}</div>}
          </div>
        </div>
      </div>
    </ManageGuard>
  );
}
