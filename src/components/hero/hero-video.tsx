"use client";

import Image from "next/image";

interface HeroVideoProps {
  trailerId: string | null | undefined;
  trailerSite: string | null | undefined;
  fallbackImage: string | null | undefined;
  title: string;
}

export function HeroVideo({
  trailerId,
  trailerSite,
  fallbackImage,
  title,
}: HeroVideoProps) {
  const hasYouTubeTrailer = trailerSite === "youtube" && trailerId;

  if (hasYouTubeTrailer) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerId}&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[177.77vh] min-w-full h-[56.25vw] min-h-full"
          style={{ pointerEvents: "none" }}
          title={`${title} trailer`}
        />
      </div>
    );
  }

  if (fallbackImage) {
    return (
      <Image
        src={fallbackImage}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    );
  }

  return <div className="absolute inset-0 bg-gray-900" />;
}
