import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchDataFromApi from "@/api";
import { movieType, DiscoverParams } from "./interface";

const fetchDiscoverByType = (
  mediatype: string | undefined,
  { page, genreIds, sortBy }: DiscoverParams,
) =>
  fetchDataFromApi<movieType>(`/discover/${mediatype}`, {
    page,
    ...(genreIds && genreIds.length > 0
      ? { with_genres: genreIds.join(",") }
      : {}),
    ...(sortBy ? { sort_by: sortBy } : {}),
  });

export const useDiscoverByType = (
  mediatype: string | undefined,
  params: DiscoverParams,
) =>
  useQuery({
    queryKey: [
      "explore-data",
      mediatype,
      params.page,
      params.genreIds,
      params.sortBy,
    ],
    queryFn: () => fetchDiscoverByType(mediatype, params),
    placeholderData: keepPreviousData,
  });
