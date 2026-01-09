"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { useUser } from "@/context/user-context";
import { Footer } from "@/components/layout/footer";

export default function LandingPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/browse");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#141414] relative flex flex-col">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%),
            url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920')`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-6 md:px-12 py-6">
        <h1 className="text-[#e50914] text-3xl md:text-4xl font-bold tracking-tight">
          ANIFLIX
        </h1>
      </header>

      {/* Login form */}
      <main className="relative z-10 flex items-center justify-center flex-1">
        <div className="bg-black/75 px-8 md:px-16 py-12 rounded-md w-full max-w-md mx-4">
          <h2 className="text-3xl font-bold text-white mb-8">Sign In</h2>
          <LoginForm />
          <p className="text-gray-400 text-sm mt-6">
            Enter your details to browse our anime collection.
          </p>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
