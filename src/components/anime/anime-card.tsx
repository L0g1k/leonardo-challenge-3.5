"use client";

import Image from "next/image";
import { AnimeMedia } from "@/lib/anilist/types";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  anime: AnimeMedia;
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
}

export function AnimeCard({ anime, onClick, className, isLoading }: AnimeCardProps) {
  const title = anime.title.english || anime.title.romaji;
  const imageUrl = anime.coverImage.large || anime.coverImage.medium;

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "group relative aspect-[2/3] rounded-md overflow-hidden bg-gray-800 transition-transform duration-300 hover:scale-105 hover:z-10 focus:outline-none focus:ring-2 focus:ring-[#e50914]",
        isLoading && "pointer-events-none",
        className
      )}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        className="object-cover"
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Info on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white text-sm font-semibold line-clamp-2 mb-1">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-300">
          {anime.averageScore && (
            <span className="text-green-400">{anime.averageScore}%</span>
          )}
          {anime.episodes && <span>{anime.episodes} eps</span>}
        </div>
        {anime.genres && anime.genres.length > 0 && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            {anime.genres.slice(0, 3).join(" • ")}
          </p>
        )}
      </div>

      {/* Score badge */}
      {anime.averageScore && !isLoading && (
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-green-400 font-medium">
          {anime.averageScore}%
        </div>
      )}
    </button>
  );
}
