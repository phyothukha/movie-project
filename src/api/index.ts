import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const fetchDataFromApi = async (url: string, params?: object) => {
  const { data } = await axios.get(BASE_URL + url, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
    params,
  });
  return data;
};

export default fetchDataFromApi;
