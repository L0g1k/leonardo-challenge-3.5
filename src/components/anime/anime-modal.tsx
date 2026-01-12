"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimeMedia } from "@/lib/anilist/types";
import { X, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimeModalProps {
  anime: AnimeMedia | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnimeModal({ anime, isOpen, onClose }: AnimeModalProps) {
  if (!anime) return null;

  const title = anime.title.english || anime.title.romaji || "";
  const hasTrailer = anime.trailer?.site === "youtube" && anime.trailer?.id;

  const cleanDescription = (desc: string | null) => {
    if (!desc) return "";
    return desc
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/\n{3,}/g, "\n\n");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-[#181818] border-none text-white sm:rounded-lg rounded-none fixed sm:top-[50%] top-0 sm:translate-y-[-50%] translate-y-0 sm:h-auto h-full sm:max-h-[90vh] max-h-full">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        {/* Hero/Banner section */}
        <div className="relative aspect-video w-full bg-gray-900">
          {hasTrailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${anime.trailer?.id}?autoplay=0&controls=1&modestbranding=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : anime.bannerImage ? (
            <>
              <Image
                src={anime.bannerImage}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            </>
          ) : anime.coverImage?.extraLarge ? (
            <>
              <Image
                src={anime.coverImage.extraLarge}
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
            {anime.title.native && (
              <p className="text-gray-400 text-sm">{anime.title.native}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {anime.averageScore && (
              <span className="flex items-center gap-1 text-green-400">
                <Star className="w-4 h-4 fill-current" />
                {anime.averageScore}% Rating
              </span>
            )}
            {anime.seasonYear && (
              <span className="text-gray-400">
                {anime.season} {anime.seasonYear}
              </span>
            )}
            {anime.episodes && (
              <span className="text-gray-400">{anime.episodes} Episodes</span>
            )}
            {anime.duration && (
              <span className="text-gray-400">{anime.duration} min/ep</span>
            )}
            <span
              className={`px-2 py-0.5 rounded text-xs ${
                anime.status === "FINISHED"
                  ? "bg-green-900 text-green-300"
                  : anime.status === "RELEASING"
                  ? "bg-blue-900 text-blue-300"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {anime.status}
            </span>
          </div>

          {/* Studios */}
          {anime.studios?.nodes && anime.studios.nodes.length > 0 && (
            <div className="text-sm">
              <span className="text-gray-400">Studio: </span>
              <span className="text-white">
                {anime.studios.nodes.map((s) => s.name).join(", ")}
              </span>
            </div>
          )}

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
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
          {anime.description && (
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {cleanDescription(anime.description)}
            </div>
          )}

          {/* Characters */}
          {anime.characters?.nodes && anime.characters.nodes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Characters</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {anime.characters.nodes.slice(0, 6).map((char) => (
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
          {hasTrailer && anime.bannerImage && (
            <Button
              onClick={() => {
                window.open(
                  `https://www.youtube.com/watch?v=${anime.trailer?.id}`,
                  "_blank"
                );
              }}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Watch Trailer
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
