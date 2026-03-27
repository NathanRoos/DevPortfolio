"use client";

import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  background?: string;
  className?: string;
}

export function ShimmerButton({
  children,
  shimmerColor = "#f0a04b",
  shimmerSize = "0.1em",
  borderRadius = "0.75rem",
  background = "rgba(240, 160, 75, 0.1)",
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative overflow-hidden px-6 py-3 font-medium",
        "text-primary-400 hover:text-white",
        "border border-primary-500/30 hover:border-primary-500/60",
        "transition-all duration-300",
        className
      )}
      style={{ borderRadius, background }}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
      >
        <div
          className="absolute inset-[-100%] animate-shimmer"
          style={{
            background: `linear-gradient(90deg, transparent, ${shimmerColor}20, transparent)`,
          }}
        />
      </div>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
