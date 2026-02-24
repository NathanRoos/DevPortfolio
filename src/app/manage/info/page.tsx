"use client";
import { useState, useEffect } from "react";
import ManageGuard from "../../../components/AdminGuard";

export default function ManageInfoPage() {
  const [form, setForm] = useState({
    contactEmail: "",
    helpInfo: "",
    directEmail: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch current info from API
    fetch("/api/info")
      .then(res => res.json())
      .then(data => {
        setForm({
          contactEmail: data.contactEmail || "",
          helpInfo: data.helpInfo || "",
          directEmail: data.directEmail || ""
        });
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setMessage("Info updated!");
    } else {
      setMessage("Failed to update info.");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <ManageGuard>
      <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-8">Edit Site Info</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block font-semibold text-primary-400 mb-2">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">What I Can Help With</label>
            <textarea
              name="helpInfo"
              value={form.helpInfo}
              onChange={handleChange}
              className="input w-full"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-primary-400 mb-2">Direct Email (for Send Message section)</label>
            <input
              type="email"
              name="directEmail"
              value={form.directEmail}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {message && <div className="mt-2 text-center text-green-400">{message}</div>}
        </form>
      </div>
    </ManageGuard>
  );
}
