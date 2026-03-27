"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HobbiesRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/about"); }, [router]);
  return null;
}
