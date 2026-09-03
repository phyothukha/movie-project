import { resultType } from "@/types/MovieType/movietype";

export interface CastBio {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface castResultType {
  adult: boolean;
  gender: number;
  id: number;
  known_for: [
    {
      adult: false;
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      media_type: string;
      original_language: string;
      original_title: string;
      overview: string;
      poster_path: string;
      release_date: string;
      title: string;
      video: false;
      vote_average: number;
      vote_count: number;
    }
  ];
  known_for_department: string;
  name: string;
  popularity: string;
  profile_path: string;
}

export interface CastListType {
  page: number;
  results: castResultType[];
  total_pages: number;
  total_results: number;
}

export interface CastMovieType {
  cast: resultType[];
  crew: resultType[];
  id: number;
}
