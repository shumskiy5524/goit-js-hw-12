import axios from "axios";

const API_KEY = '54182514-8e89b17f0b2f5be4b382492b8';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data.hits; // масив зображень
  } catch (error) {
    console.error('Pixabay API error:', error);
    throw error;
  }
}