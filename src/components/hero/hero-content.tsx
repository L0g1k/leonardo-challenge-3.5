"use client";

import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { AnimeMedia } from "@/lib/anilist/types";

interface HeroContentProps {
  anime: AnimeMedia;
  onMoreInfo: () => void;
}

export function HeroContent({ anime, onMoreInfo }: HeroContentProps) {
  const title = anime.title.english || anime.title.romaji;

  const truncateDescription = (desc: string | null, maxLength: number = 200) => {
    if (!desc) return "";
    const cleaned = desc.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "");
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.slice(0, maxLength).trim() + "...";
  };

  return (
    <>
      {/* Gradient overlays - full height */}
      <div className="absolute inset-0 z-10 hero-gradient-bottom" />
      <div className="absolute inset-0 z-10 hero-gradient-left" />

      {/* Content - positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-12 pb-24 md:pb-32 max-w-2xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>

        {anime.description && (
          <p className="text-sm md:text-base text-gray-200 mb-6 line-clamp-3 md:line-clamp-4 drop-shadow">
            {truncateDescription(anime.description, 250)}
          </p>
        )}

        <div className="flex items-center gap-3">
          <Button
            onClick={onMoreInfo}
            variant="secondary"
            className="bg-gray-500/70 hover:bg-gray-500/90 text-white px-4 md:px-6 py-2 md:py-3 h-auto text-sm md:text-base font-semibold"
          >
            <Info className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            More Info
          </Button>
        </div>

        {/* Genre tags */}
        {anime.genres && anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {anime.genres.slice(0, 4).map((genre) => (
              <span
                key={genre}
                className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
