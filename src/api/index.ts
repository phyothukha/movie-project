import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const fetchDataFromApi = async <T = unknown>(
  url: string,
  params?: object
): Promise<T> => {
  const { data } = await axios.get<T>(BASE_URL + url, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
    params,
  });
  return data;
};

export default fetchDataFromApi;
