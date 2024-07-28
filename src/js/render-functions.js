export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}" data-title="${image.tags}">
        <img 
          class="gallery-image" 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
        />
        <div class="gallery-info">
          <p class="info-item"><b>Likes</b>: ${image.likes}</p>
          <p class="info-item"><b>Views</b>: ${image.views}</p>
          <p class="info-item"><b>Comments</b>: ${image.comments}</p>
          <p class="info-item"><b>Downloads</b>: ${image.downloads}</p>
        </div>
      </a>
    </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

export function showNoResultsMessage() {
  iziToast.error({
    title: 'Error',
    message: 'Sorry, there are no images. Please try again!',
  });
}

export function showEndOfResultsMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
  });
}
