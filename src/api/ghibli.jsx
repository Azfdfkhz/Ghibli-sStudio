// services/api.js
import axios from "axios";

const API_BASE = "https://ghibliapi.vercel.app";

// List of fallback endpoints
const FALLBACK_ENDPOINTS = [
  API_BASE,
  'https://api.allorigins.win/raw?url=https://ghibliapi.vercel.app'
];

// Retry fetch dengan multiple endpoints
const fetchWithFallback = async (path) => {
  let lastError = null;

  for (const endpoint of FALLBACK_ENDPOINTS) {
    try {
      console.log(`Trying: ${endpoint}${path}`);
      const response = await axios.get(`${endpoint}${path}`, {
        timeout: 10000 // 10 second timeout
      });
      
      if (response.data) {
        console.log(`Success with: ${endpoint}${path}`);
        return response.data;
      }
    } catch (error) {
      console.log(`Failed: ${endpoint}${path}`, error.message);
      lastError = error;
      continue;
    }
  }

  throw lastError || new Error('All API endpoints failed');
};

export const api = {
  // Get all films
  getFilms: async () => {
    try {
      return await fetchWithFallback('/films');
    } catch (error) {
      console.error('Error fetching films:', error);
      throw error;
    }
  },

  // Get single film by ID
  getFilm: async (id) => {
    try {
      return await fetchWithFallback(`/films/${id}`);
    } catch (error) {
      console.error(`Error fetching film ${id}:`, error);
      throw error;
    }
  },

  // Get all characters
  getCharacters: async () => {
    try {
      return await fetchWithFallback('/people');
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  },

  // Get characters by film
  getCharactersByFilm: async (filmId) => {
    try {
      const characters = await fetchWithFallback('/people');
      return characters.filter(char => 
        char.films?.includes(`${API_BASE}/films/${filmId}`)
      );
    } catch (error) {
      console.error(`Error fetching characters for film ${filmId}:`, error);
      throw error;
    }
  }
};

// Fallback data jika semua API gagal
export const FALLBACK_FILMS = [
  {
    id: "1",
    title: "My Neighbor Totoro",
    original_title: "となりのトトロ",
    description: "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest.",
    director: "Hayao Miyazaki",
    producer: "Hayao Miyazaki",
    release_date: "1988",
    running_time: "86",
    rt_score: "93",
    movie_banner: "https://image.tmdb.org/t/p/original/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg"
  }
];