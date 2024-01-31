interface dateType {
  maximum: string;
  minimum: string;
}

export interface resultType {
  adult: boolean;
  backdrop_path: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  origin_country?: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  media_type?: string;
  release_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
[];

export interface movieType {
  dates?: dateType;
  page: number;
  results: resultType[];
  total_pages: number;
  total_results: number;
}
