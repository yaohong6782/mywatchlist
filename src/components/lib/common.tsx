import axios from "axios";

export const GET_MANHWA_API = 'https://api.mangadex.org/manga?limit=10&title={}'

export const searchManhwa = async (query : string) => {
  const url = GET_MANHWA_API.replace('{}', query);
  const response = await axios.get(url);
  return response.data;
}