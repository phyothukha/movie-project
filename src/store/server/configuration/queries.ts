import { useQuery } from "@tanstack/react-query";
import fetchDataFromApi from "@/api";
import { configuretype } from "./interface";

const fetchConfiguration = () =>
  fetchDataFromApi<configuretype>("/configuration");

export const useGetConfiguration = () =>
  useQuery({
    queryKey: ["configure"],
    queryFn: fetchConfiguration,
    refetchOnWindowFocus: false,
  });
