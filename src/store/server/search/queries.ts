import { useInfiniteQuery } from "@tanstack/react-query";
import fetchDataFromApi from "@/api";
import { movieType } from "./interface";

const fetchSearchMulti = (query: string | undefined, page: number) =>
  fetchDataFromApi<movieType>("search/multi", { query, page });

export const useSearchMulti = (query: string | undefined) =>
  useInfiniteQuery({
    queryKey: ["search-data", query],
    queryFn: ({ pageParam }) => fetchSearchMulti(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: Boolean(query),
  });
