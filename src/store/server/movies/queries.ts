import { useQuery } from "@tanstack/react-query";
import fetchDataFromApi from "@/api";
import { movieType } from "./interface";

const fetchUpcomingMovies = () =>
  fetchDataFromApi<movieType>("/movie/upcoming");

const fetchTrending = (timeWindow: "day" | "week") =>
  fetchDataFromApi<movieType>(`/trending/all/${timeWindow}`);

const fetchPopular = (mediatype: string) =>
  fetchDataFromApi<movieType>(`/${mediatype}/popular`);

const fetchTopRated = (mediatype: string) =>
  fetchDataFromApi<movieType>(`/${mediatype}/top_rated`);

export const useGetUpcomingMovies = () =>
  useQuery({
    queryKey: ["movie-list"],
    queryFn: fetchUpcomingMovies,
    refetchOnWindowFocus: false,
  });

export const useGetTrending = (timeWindow: "day" | "week") =>
  useQuery({
    queryKey: ["trend-movie", timeWindow],
    queryFn: () => fetchTrending(timeWindow),
    refetchOnWindowFocus: false,
  });

export const useGetPopular = (mediatype: string) =>
  useQuery({
    queryKey: ["popular-movie", mediatype],
    queryFn: () => fetchPopular(mediatype),
    refetchOnWindowFocus: false,
  });

export const useGetTopRated = (mediatype: string) =>
  useQuery({
    queryKey: ["top-rated-movie", mediatype],
    queryFn: () => fetchTopRated(mediatype),
    refetchOnWindowFocus: false,
  });
