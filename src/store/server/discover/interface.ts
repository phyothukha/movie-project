export type { movieType } from "@/types/MovieType/movietype";

export interface sortDataType {
  value: string;
  label: string;
}

export interface DiscoverParams {
  page: number;
  genreIds?: number[];
  sortBy?: string;
}
