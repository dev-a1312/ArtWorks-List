import axios from "axios";

const API_URL = "https://api.artic.edu/api/v1/artworks";

export const fetchArtworks = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, limit: pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching artworks from API:", error);
    throw error;
  }
};
