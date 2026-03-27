"use client";

import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BentoCard({ children, className, onClick }: BentoCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-gradient-to-br from-dark-900/90 to-dark-950/90",
        "border border-white/[0.08] hover:border-primary-500/30",
        "p-6 transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary-500/5",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
