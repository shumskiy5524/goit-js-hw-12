import axios from "axios";

const API_KEY = '54182514-8e89b17f0b2f5be4b382492b8';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Pixabay API error:', error);
    throw error;
  }
}
