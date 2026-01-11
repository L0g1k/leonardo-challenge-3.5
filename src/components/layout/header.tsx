"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { UserProfile } from "@/components/auth/user-profile";
import { cn } from "@/lib/utils";

export function Header() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-4 md:px-12",
        isScrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-8">
          <Link href="/browse">
            <Image
              src="/aniflix.png"
              alt="Aniflix"
              width={120}
              height={33}
              className="h-6 md:h-8 w-auto"
              priority
            />
          </Link>
        </div>

        <UserProfile />
      </div>
    </header>
  );
}
