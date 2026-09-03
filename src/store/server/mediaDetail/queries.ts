import { useQuery } from "@tanstack/react-query";
import fetchDataFromApi from "@/api";
import { movieType, CreditType, videoType, detailProps } from "./interface";

const fetchMediaDetail = (
  mediatype: string | undefined,
  id: string | undefined
) => fetchDataFromApi<detailProps>(`${mediatype}/${id}`);

const fetchMediaVideos = (
  mediatype: string | undefined,
  id: string | undefined
) => fetchDataFromApi<videoType>(`${mediatype}/${id}/videos`);

const fetchMediaCredits = (
  mediatype: string | undefined,
  id: string | undefined
) => fetchDataFromApi<CreditType>(`${mediatype}/${id}/credits`);

const fetchSimilarMedia = (
  mediatype: string | undefined,
  id: string | undefined
) => fetchDataFromApi<movieType>(`${mediatype}/${id}/similar`);

const fetchRecommendedMedia = (
  mediatype: string | undefined,
  id: string | undefined
) => fetchDataFromApi<movieType>(`${mediatype}/${id}/recommendations`);

export const useGetMediaDetail = (
  mediatype: string | undefined,
  id: string | undefined
) =>
  useQuery({
    queryKey: ["movie-detail", { mediatype, id }],
    queryFn: () => fetchMediaDetail(mediatype, id),
    refetchOnWindowFocus: false,
  });

export const useGetMediaVideos = (
  mediatype: string | undefined,
  id: string | undefined
) =>
  useQuery({
    queryKey: ["detail-video", id],
    queryFn: () => fetchMediaVideos(mediatype, id),
    refetchOnWindowFocus: false,
  });

export const useGetMediaCredits = (
  mediatype: string | undefined,
  id: string | undefined
) =>
  useQuery({
    queryKey: ["credits", { id, mediatype }],
    queryFn: () => fetchMediaCredits(mediatype, id),
  });

export const useGetSimilarMedia = (
  mediatype: string | undefined,
  id: string | undefined
) =>
  useQuery({
    queryKey: ["Similar-movie", mediatype, id],
    queryFn: () => fetchSimilarMedia(mediatype, id),
    refetchOnWindowFocus: false,
  });

export const useGetRecommendedMedia = (
  mediatype: string | undefined,
  id: string | undefined
) =>
  useQuery({
    queryKey: ["recommand-movie", { mediatype, id }],
    queryFn: () => fetchRecommendedMedia(mediatype, id),
    refetchOnWindowFocus: false,
  });
