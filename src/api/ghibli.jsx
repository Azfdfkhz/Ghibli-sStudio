import axios from "axios";

const API_BASE = "https://ghibliapi.vercel.app";

export const getFilms = async () => {
  const res = await axios.get(`${API_BASE}/films`);
  return res.data;
};
