"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsWithSearch from "@/components/BlogsWithSearch";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Ensure this is only run on the client-side
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");

      if (!userData) {
        // If there's no user in localStorage, redirect to sign-in page
        router.replace("/sign-in");
        return;
      }

      try {
        const user = JSON.parse(userData);
        
        // If user object is invalid (missing fullName), redirect to sign-in
        if (!user?.fullName) {
          router.replace("/sign-in");
        }
      } catch (error) {
        // If JSON parsing fails, redirect to sign-in
        router.replace("/sign-in");
      }
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <BlogsWithSearch />
      <Footer />
    </>
  );
}
