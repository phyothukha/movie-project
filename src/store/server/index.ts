import Axios from "axios";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const authHeader = () => ({
  //   ContentType: "Application/json",
  Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_TOKEN}`,
});
