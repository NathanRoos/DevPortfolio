"use client";

import { useState, useEffect } from "react";
import ManageGuard from "../../../components/AdminGuard";

export default function ManageInfoPage() {
  const [form, setForm] = useState({
    contactEmail: "",
    helpInfo: "",
    directEmail: "",
    homeTitle: "",
    homeDescription: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({
    contactEmail: false,
    helpInfo: false,
    directEmail: false,
    homeTitle: false,
    homeDescription: false
  });
  const [message, setMessage] = useState({
    contactEmail: "",
    helpInfo: "",
    directEmail: "",
    homeTitle: "",
    homeDescription: ""
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
          homeDescription: data.homeDescription || "Crafting scalable applications with cutting-edge technologies."
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
        <h1 className="text-4xl font-bold gradient-text mb-8">Edit Site Info</h1>
        <div className="space-y-8">
          <div>
            <label className="block font-semibold text-primary-400 mb-2">Homepage Title</label>
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
            <p className="text-xs text-gray-400 mt-1">This is the &lt;Full Stack Developer & DevOps Developer/&gt; text. Styling will remain unchanged.</p>
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">Homepage Description</label>
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
            <p className="text-xs text-gray-400 mt-1">This is the subtitle text under your name. Styling will remain unchanged.</p>
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">Contact Email</label>
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
            <label className="block font-semibold text-primary-400 mb-2">What I Can Help With</label>
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
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">Direct Email (for Send Message section)</label>
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
