"use client";

import { AnimeMedia } from "@/lib/anilist/types";
import { AnimeCard } from "./anime-card";
import { Skeleton } from "@/components/ui/skeleton";

interface AnimeGridProps {
  anime: AnimeMedia[];
  onAnimeClick: (anime: AnimeMedia) => void;
  isLoading?: boolean;
  loadingAnimeId?: number | null;
}

export function AnimeGrid({ anime, onAnimeClick, isLoading, loadingAnimeId }: AnimeGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4"
        role="status"
        aria-busy="true"
        aria-label="Loading anime list"
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] rounded-md bg-gray-800" aria-hidden="true" />
        ))}
        <span className="sr-only">Loading anime list...</span>
      </div>
    );
  }

  if (!anime || anime.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No anime found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
      {anime.map((item) => (
        <AnimeCard
          key={item.id}
          anime={item}
          onClick={() => onAnimeClick(item)}
          isLoading={loadingAnimeId === item.id}
        />
      ))}
    </div>
  );
}
