"use client";

import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  className?: string;
}

export function AnimatedBeam({ className }: AnimatedBeamProps) {
  return (
    <div
      className={cn(
        "absolute h-px w-full",
        "bg-gradient-to-r from-transparent via-primary-500/50 to-transparent",
        "animate-beam",
        className
      )}
    />
  );
}
