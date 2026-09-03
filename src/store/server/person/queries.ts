import { useQuery } from "@tanstack/react-query";
import fetchDataFromApi from "@/api";
import { CastBio, CastListType, CastMovieType } from "./interface";

const fetchPopularPeople = () =>
  fetchDataFromApi<CastListType>("person/popular");

const fetchPersonDetail = (castId: string | undefined) =>
  fetchDataFromApi<CastBio>(`person/${castId}`);

const fetchPersonCombinedCredits = (castId: string | undefined) =>
  fetchDataFromApi<CastMovieType>(`/person/${castId}/combined_credits`);

export const useGetPopularPeople = () =>
  useQuery({
    queryKey: ["cast-data"],
    queryFn: fetchPopularPeople,
    refetchOnWindowFocus: false,
  });

export const useGetPersonDetail = (castId: string | undefined) =>
  useQuery({
    queryKey: ["cast-bio-data", castId],
    queryFn: () => fetchPersonDetail(castId),
    refetchOnWindowFocus: false,
  });

export const useGetPersonCombinedCredits = (castId: string | undefined) =>
  useQuery({
    queryKey: ["cast-video-data", castId],
    queryFn: () => fetchPersonCombinedCredits(castId),
  });
