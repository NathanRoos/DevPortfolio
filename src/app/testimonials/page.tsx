"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TestimonialsRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/contact#testimonials"); }, [router]);
  return null;
}
