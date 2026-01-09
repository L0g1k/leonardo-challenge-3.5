"use client";

import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ANIME_DETAIL_QUERY } from "@/lib/anilist/queries";
import { AnimeDetailResponse, AnimeMedia } from "@/lib/anilist/types";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimeModalProps {
  anime: AnimeMedia | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnimeModal({ anime, isOpen, onClose }: AnimeModalProps) {
  const { data, loading } = useQuery<AnimeDetailResponse>(ANIME_DETAIL_QUERY, {
    variables: { id: anime?.id },
    skip: !anime?.id || !isOpen,
  });

  const details = data?.Media || anime;
  const title = details?.title.english || details?.title.romaji || "";
  const hasTrailer = details?.trailer?.site === "youtube" && details?.trailer?.id;

  const cleanDescription = (desc: string | null) => {
    if (!desc) return "";
    return desc
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/\n{3,}/g, "\n\n");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-[#181818] border-none text-white">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        {/* Hero/Banner section */}
        <div className="relative aspect-video w-full bg-gray-900">
          {loading ? (
            <Skeleton className="absolute inset-0 bg-gray-800" />
          ) : hasTrailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${details?.trailer?.id}?autoplay=0&controls=1&modestbranding=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : details?.bannerImage ? (
            <>
              <Image
                src={details.bannerImage}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            </>
          ) : details?.coverImage?.extraLarge ? (
            <>
              <Image
                src={details.coverImage.extraLarge}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            </>
          ) : null}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center hover:bg-[#282828] transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
            {details?.title.native && (
              <p className="text-gray-400 text-sm">{details.title.native}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-3/4 bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
              <Skeleton className="h-20 w-full bg-gray-700" />
            </div>
          ) : (
            <>
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {details?.averageScore && (
                  <span className="flex items-center gap-1 text-green-400">
                    <Star className="w-4 h-4 fill-current" />
                    {details.averageScore}% Rating
                  </span>
                )}
                {details?.seasonYear && (
                  <span className="text-gray-400">
                    {details.season} {details.seasonYear}
                  </span>
                )}
                {details?.episodes && (
                  <span className="text-gray-400">{details.episodes} Episodes</span>
                )}
                {details?.duration && (
                  <span className="text-gray-400">{details.duration} min/ep</span>
                )}
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    details?.status === "FINISHED"
                      ? "bg-green-900 text-green-300"
                      : details?.status === "RELEASING"
                      ? "bg-blue-900 text-blue-300"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {details?.status}
                </span>
              </div>

              {/* Studios */}
              {details?.studios?.nodes && details.studios.nodes.length > 0 && (
                <div className="text-sm">
                  <span className="text-gray-400">Studio: </span>
                  <span className="text-white">
                    {details.studios.nodes.map((s) => s.name).join(", ")}
                  </span>
                </div>
              )}

              {/* Genres */}
              {details?.genres && details.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {details.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {details?.description && (
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {cleanDescription(details.description)}
                </div>
              )}

              {/* Characters */}
              {details?.characters?.nodes && details.characters.nodes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Characters</h3>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                    {details.characters.nodes.slice(0, 6).map((char) => (
                      <div key={char.id} className="text-center">
                        <div className="relative aspect-square rounded-full overflow-hidden mb-2 bg-gray-700">
                          {char.image?.medium && (
                            <Image
                              src={char.image.medium}
                              alt={char.name.full}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <p className="text-xs text-gray-300 line-clamp-1">
                          {char.name.full}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trailer button if not shown in banner */}
              {hasTrailer && details?.bannerImage && (
                <Button
                  onClick={() => {
                    window.open(
                      `https://www.youtube.com/watch?v=${details.trailer?.id}`,
                      "_blank"
                    );
                  }}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Trailer
                </Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
