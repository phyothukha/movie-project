import { useInfiniteQuery } from "@tanstack/react-query";
import fetchDataFromApi from "@/api";
import { movieType, DiscoverParams } from "./interface";

const fetchDiscoverByType = (
  mediatype: string | undefined,
  page: number,
  { genreIds, sortBy }: Omit<DiscoverParams, "page">,
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
  params: Omit<DiscoverParams, "page">,
) =>
  useInfiniteQuery({
    queryKey: ["explore-data", mediatype, params.genreIds, params.sortBy],
    queryFn: ({ pageParam }) =>
      fetchDiscoverByType(mediatype, pageParam, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
