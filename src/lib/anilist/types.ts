export interface AnimeTitle {
  english: string | null;
  romaji: string;
  native: string | null;
}

export interface CoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string | null;
}

export interface Trailer {
  id: string;
  site: "youtube" | "dailymotion";
  thumbnail: string | null;
}

export interface Studio {
  id: number;
  name: string;
}

export interface Character {
  id: number;
  name: { full: string };
  image: { medium: string };
}

export interface AnimeMedia {
  id: number;
  title: AnimeTitle;
  description: string | null;
  bannerImage: string | null;
  coverImage: CoverImage;
  trailer: Trailer | null;
  genres: string[];
  averageScore: number | null;
  popularity: number;
  episodes: number | null;
  duration: number | null;
  status: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS";
  season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
  seasonYear: number | null;
  studios?: { nodes: Studio[] };
  characters?: { nodes: Character[] };
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface FeaturedAnimeResponse {
  Media: AnimeMedia;
}

export interface PaginatedAnimeResponse {
  Page: {
    pageInfo: PageInfo;
    media: AnimeMedia[];
  };
}

export interface AnimeDetailResponse {
  Media: AnimeMedia;
}
