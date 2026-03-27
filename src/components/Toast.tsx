"use client";

import { useState, useEffect, useCallback } from "react";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "error" | "success" | "info" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let addToastGlobal: ((message: string, type?: ToastType) => void) | null = null;

export function toast(message: string, type: ToastType = "error") {
  addToastGlobal?.(message, type);
}

const icons: Record<ToastType, React.ReactNode> = {
  error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
  success: <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />,
};

const borders: Record<ToastType, string> = {
  error: "border-red-500/30",
  success: "border-green-500/30",
  info: "border-blue-500/30",
  warning: "border-yellow-500/30",
};

const glows: Record<ToastType, string> = {
  error: "shadow-red-500/10",
  success: "shadow-green-500/10",
  info: "shadow-blue-500/10",
  warning: "shadow-yellow-500/10",
};

let nextId = 0;

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "error") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  useEffect(() => {
    addToastGlobal = addToast;
    return () => { addToastGlobal = null; };
  }, [addToast]);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto animate-slide-in-right bg-dark-900/95 backdrop-blur-xl border ${borders[t.type]} rounded-xl px-4 py-3 shadow-lg ${glows[t.type]} flex items-start gap-3`}
        >
          {icons[t.type]}
          <p className="text-sm text-gray-200 flex-1 pt-0.5">{t.message}</p>
          <button
            onClick={() => dismiss(t.id)}
            className="text-gray-500 hover:text-gray-300 transition-colors shrink-0 pt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
