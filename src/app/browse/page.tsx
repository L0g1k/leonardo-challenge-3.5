"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/hero/hero-section";
import { AnimeGrid } from "@/components/anime/anime-grid";
import { AnimeModal } from "@/components/anime/anime-modal";
import { PAGINATED_ANIME_QUERY } from "@/lib/anilist/queries";
import { PaginatedAnimeResponse, AnimeMedia } from "@/lib/anilist/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PER_PAGE = 50;

function BrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedAnime, setSelectedAnime] = useState<AnimeMedia | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, loading, error } = useQuery<PaginatedAnimeResponse>(
    PAGINATED_ANIME_QUERY,
    {
      variables: { page: currentPage, perPage: PER_PAGE },
    }
  );

  const pageInfo = data?.Page.pageInfo;
  const animeList = data?.Page.media || [];

  const handlePageChange = (page: number) => {
    router.push(`/browse?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnimeClick = (anime: AnimeMedia) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAnime(null);
  };

  const renderPaginationItems = () => {
    if (!pageInfo) return null;

    const { currentPage, lastPage } = pageInfo;
    const items: React.ReactNode[] = [];

    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          href={`/browse?page=1`}
          isActive={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(1);
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if needed before current page range
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(lastPage - 1, currentPage + 1);
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`/browse?page=${i}`}
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if needed after current page range
    if (currentPage < lastPage - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if more than 1 page
    if (lastPage > 1) {
      items.push(
        <PaginationItem key={lastPage}>
          <PaginationLink
            href={`/browse?page=${lastPage}`}
            isActive={currentPage === lastPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(lastPage);
            }}
          >
            {lastPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      <Header />

      {/* Hero Section */}
      <HeroSection onMoreInfo={handleAnimeClick} />

      {/* Main Content */}
      <main className="relative z-10 -mt-24 md:-mt-32 px-4 md:px-12 pb-12">
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
            Popular Anime
          </h2>

          {error ? (
            <div className="text-center py-12">
              <p className="text-red-400">Failed to load anime</p>
              <p className="text-gray-500 text-sm mt-2">{error.message}</p>
            </div>
          ) : (
            <>
              <AnimeGrid
                anime={animeList}
                onAnimeClick={handleAnimeClick}
                isLoading={loading}
              />

              {/* Pagination */}
              {pageInfo && pageInfo.lastPage > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href={`/browse?page=${currentPage - 1}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                              handlePageChange(currentPage - 1);
                            }
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {renderPaginationItems()}

                      <PaginationItem>
                        <PaginationNext
                          href={`/browse?page=${currentPage + 1}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < pageInfo.lastPage) {
                              handlePageChange(currentPage + 1);
                            }
                          }}
                          className={
                            currentPage === pageInfo.lastPage
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {/* Page info */}
              {pageInfo && (
                <p className="text-center text-gray-500 text-sm mt-4">
                  Page {pageInfo.currentPage} of {pageInfo.lastPage} ({pageInfo.total} total anime)
                </p>
              )}
            </>
          )}
        </section>
      </main>

      {/* Anime Detail Modal */}
      <AnimeModal
        anime={selectedAnime}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <AuthGuard>
      <BrowseContent />
    </AuthGuard>
  );
}
