"use client";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      onClick={() => setLanguage(language === "en" ? "fr" : "en")}
      style={{
        padding: "8px 16px",
        borderRadius: 6,
        background: "#222",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        marginLeft: 12,
      }}
    >
      {language === "en" ? "Français" : "English"}
    </button>
  );
}
