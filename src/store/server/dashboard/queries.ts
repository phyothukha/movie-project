import { useQuery } from "@tanstack/react-query";
import { authHeader, axios } from "..";
import { MovieBackdropType, Configuretype } from "./interface";

const getConfiguredata = async (): Promise<Configuretype> => {
  const response = await axios.get("/configuration", {
    // https://api.themoviedb.org/3/configuration
    headers: authHeader(),
  });

  console.log(response);
  return response.data;
};

export const useGetConfigureData = () => {
  return useQuery({
    queryKey: ["configure"],
    queryFn: () => getConfiguredata(),
    refetchOnWindowFocus: false,
  });
};

const getmoviebackdrop = async (): Promise<MovieBackdropType> => {
  const response = await axios.get("/movie/upcoming", {
    headers: authHeader(),
  });
  console.log(response);
  return response.data;
  //   return response.data; // Assuming the data is in response.data
};

export const useGetMovieBackdrop = () => {
  return useQuery({
    queryKey: ["movie-list"],
    queryFn: () => getmoviebackdrop(),
    refetchOnWindowFocus: false,
  });
};
