import {
  AnimeDetailsResponse,
  AnimeRecommendationsResponse,
  AnimeResponse,
} from "@/lib/anime-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "https://api.jikan.moe/v4";

// Helper function to handle API rate limiting
async function fetchWithRetry(url: string, retries = 3, delay = 1000) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 429 &&
      retries > 0
    ) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, delay * 2);
    }
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, delay * 2);
    }
    throw error;
  }
}

// Search anime
export const useSearchAnime = (query: string, page = 1, pageSize = 20) => {
  return useQuery<AnimeResponse>({
    queryKey: ["animeSearch", query, page, pageSize],
    queryFn: async () => {
      if (!query) {
        // If no query, fetch top anime instead
        const response = await fetchWithRetry(
          `${API_BASE_URL}/top/anime?page=${page}&limit=${pageSize}`
        );
        if (!response.data) {
          throw new Error(`API error: ${response.status}`);
        }
        return response.data;
      }

      const response = await fetchWithRetry(
        `${API_BASE_URL}/anime?q=${encodeURIComponent(
          query
        )}&page=${page}&limit=${pageSize}&sfw=true`
      );
      if (!response.data) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.data;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get anime details
export const useAnimeDetails = (id: string) => {
  return useQuery<AnimeDetailsResponse>({
    queryKey: ["animeDetails", id],
    queryFn: async () => {
      const response = await fetchWithRetry(`${API_BASE_URL}/anime/${id}/full`);
      if (!response.data) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.data;
    },
    enabled: !!id,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Get anime recommendations
export const useAnimeRecommendations = (id: string) => {
  return useQuery<AnimeRecommendationsResponse>({
    queryKey: ["animeRecommendations", id],
    queryFn: async () => {
      const response = await fetchWithRetry(
        `${API_BASE_URL}/anime/${id}/recommendations`
      );
      if (!response.data) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.data;
    },
    enabled: !!id,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
