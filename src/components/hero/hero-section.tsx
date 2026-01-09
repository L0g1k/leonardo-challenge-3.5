"use client";

import { useQuery } from "@apollo/client/react";
import { FEATURED_ANIME_QUERY } from "@/lib/anilist/queries";
import { FeaturedAnimeResponse } from "@/lib/anilist/types";
import { HeroVideo } from "./hero-video";
import { HeroContent } from "./hero-content";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimeMedia } from "@/lib/anilist/types";

interface HeroSectionProps {
  onMoreInfo: (anime: AnimeMedia) => void;
}

export function HeroSection({ onMoreInfo }: HeroSectionProps) {
  const { data, loading, error } = useQuery<FeaturedAnimeResponse>(FEATURED_ANIME_QUERY);

  if (loading) {
    return (
      <div className="relative h-[60vh] md:h-[85vh] bg-gray-900">
        <Skeleton className="absolute inset-0 bg-gray-800" />
        <div className="absolute bottom-0 left-0 p-4 md:p-12 pb-24 space-y-4">
          <Skeleton className="h-12 w-64 bg-gray-700" />
          <Skeleton className="h-4 w-96 bg-gray-700" />
          <Skeleton className="h-4 w-80 bg-gray-700" />
          <Skeleton className="h-10 w-32 bg-gray-700" />
        </div>
      </div>
    );
  }

  if (error || !data?.Media) {
    return (
      <div className="relative h-[60vh] md:h-[85vh] bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Failed to load featured anime</p>
      </div>
    );
  }

  const anime = data.Media;
  const title = anime.title.english || anime.title.romaji;

  return (
    <div className="relative h-[60vh] md:h-[85vh] overflow-hidden">
      <HeroVideo
        trailerId={anime.trailer?.id}
        trailerSite={anime.trailer?.site}
        fallbackImage={anime.bannerImage || anime.coverImage?.extraLarge}
        title={title}
      />
      <HeroContent anime={anime} onMoreInfo={() => onMoreInfo(anime)} />
    </div>
  );
}
