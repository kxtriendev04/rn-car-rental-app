import { API_URL_IMG } from "./api";

export const getImageUrl = (url) => {
  if (!url) return null;
  return url.startsWith("http") ? url : API_URL_IMG + url;
};
