import axios from 'axios';

const API_KEY = '45010101-f091bc02c96679130727c6b77';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

let currentPage = 1;
let currentQuery = '';

export async function fetchImages() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: currentQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: PER_PAGE,
      },
    });

    const images = response.data.hits;
    const totalHits = response.data.totalHits;

    return { images, totalHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export function resetPage() {
  currentPage = 1;
}

export function incrementPage() {
  currentPage += 1;
}

export function setQuery(query) {
  currentQuery = query;
}

export function getCurrentPage() {
  return currentPage;
}
