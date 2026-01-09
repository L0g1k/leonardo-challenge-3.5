import { gql } from "@apollo/client";

export const FEATURED_ANIME_QUERY = gql`
  query FeaturedAnime {
    Media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
      id
      title {
        english
        romaji
      }
      description(asHtml: false)
      bannerImage
      coverImage {
        extraLarge
        large
        medium
      }
      trailer {
        id
        site
        thumbnail
      }
      genres
      averageScore
      episodes
      status
    }
  }
`;

export const PAGINATED_ANIME_QUERY = gql`
  query PaginatedAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: FAVOURITES_DESC, isAdult: false) {
        id
        title {
          english
          romaji
        }
        description(asHtml: false)
        bannerImage
        coverImage {
          extraLarge
          large
          medium
        }
        trailer {
          id
          site
        }
        averageScore
        episodes
        genres
      }
    }
  }
`;

export const ANIME_DETAIL_QUERY = gql`
  query AnimeDetail($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        english
        romaji
        native
      }
      description(asHtml: false)
      bannerImage
      coverImage {
        extraLarge
        large
      }
      trailer {
        id
        site
        thumbnail
      }
      genres
      averageScore
      popularity
      episodes
      duration
      status
      season
      seasonYear
      studios(isMain: true) {
        nodes {
          id
          name
        }
      }
      characters(sort: ROLE, perPage: 12) {
        nodes {
          id
          name {
            full
          }
          image {
            medium
          }
        }
      }
    }
  }
`;
