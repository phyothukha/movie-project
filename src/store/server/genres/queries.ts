import { useQuery } from "@tanstack/react-query";
import fetchDataFromApi from "@/api";
import { GenreTypeProps } from "./interface";

const fetchGenres = (mediatype: string | undefined) =>
  fetchDataFromApi<GenreTypeProps>(`/genre/${mediatype}/list`);

export const useGetGenres = (mediatype: string | undefined) =>
  useQuery({
    queryKey: ["genre-data", mediatype],
    queryFn: () => fetchGenres(mediatype),
  });
