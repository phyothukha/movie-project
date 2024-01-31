import { resultType } from "../MovieType/movietype";

export interface CastListType {
  page: number;
  results: castResultType[];
  total_pages: number;
  total_results: number;
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
[];

export interface CastMovieType {
  cast: resultType[];
  crew: resultType[];
  id: number;
}
