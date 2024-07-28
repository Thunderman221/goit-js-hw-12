import {
  fetchImages,
  setQuery,
  resetPage,
  incrementPage,
  getCurrentPage,
} from './js/pixabay-api';
import {
  renderImages,
  showNoResultsMessage,
  showEndOfResultsMessage,
} from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const PER_PAGE = 15;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-form');
  const input = document.querySelector('#search-input');
  const gallery = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');
  const loadMoreButton = document.querySelector('#load-more');

  if (!form || !input || !gallery || !loadMoreButton) {
    console.error(
      'Form, input, gallery, or load more button element not found'
    );
    return;
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'title',
    captionDelay: 250,
  });

  let totalHits = 0;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const query = input.value.trim();

    if (query === '') {
      iziToast.error({
        title: 'Error',
        message: "Search query can't be empty!",
      });
      return;
    }

    loader.style.display = 'block';
    loadMoreButton.style.display = 'none';
    setQuery(query);
    resetPage();

    try {
      const { images, totalHits: newTotalHits } = await fetchImages();
      totalHits = newTotalHits;
      gallery.innerHTML = '';

      if (images.length === 0) {
        showNoResultsMessage();
      } else {
        renderImages(images);
        lightbox.refresh();
        loadMoreButton.style.display = totalHits > PER_PAGE ? 'block' : 'none';
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
    } finally {
      loader.style.display = 'none';
    }
  });

  loadMoreButton.addEventListener('click', async () => {
    loader.style.display = 'block';
    incrementPage();

    try {
      const previousLastItem = document.querySelector(
        '.gallery-item:last-child'
      );

      const { images } = await fetchImages();
      const currentPage = getCurrentPage();

      if (images.length > 0) {
        renderImages(images);
        lightbox.refresh();

        const newImages = document.querySelectorAll('.gallery-item img');
        const lastNewImage = newImages[newImages.length - 1];

        lastNewImage.onload = () => {
          if (previousLastItem) {
            const newImagesStartPosition =
              previousLastItem.nextElementSibling.getBoundingClientRect().top +
              window.scrollY;
            window.scrollTo({
              top: newImagesStartPosition,
              behavior: 'smooth',
            });
          }
        };

        const totalLoadedImages = currentPage * PER_PAGE;
        if (totalLoadedImages >= totalHits) {
          loadMoreButton.style.display = 'none';
          showEndOfResultsMessage();
        }
      } else {
        loadMoreButton.style.display = 'none';
        showEndOfResultsMessage();
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch more images. Please try again later.',
      });
    } finally {
      loader.style.display = 'none';
    }
  });
});
