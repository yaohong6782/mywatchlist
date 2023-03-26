import axios from "axios";

export const MANHWA_API = 'https://api.mangadex.org/manga?limit=10&title={}'

export const searchManhwa = async (query : string) => {
  const url = MANHWA_API.replace('{}', query);
  const response = await axios.get(url);
  return response.data;
}