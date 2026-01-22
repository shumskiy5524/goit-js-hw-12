import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const galleryElement = document.querySelector(".gallery");
let lightbox = new SimpleLightbox(".gallery a");

export function createGallery(images) {
  const markup = images.map(img => `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p>Likes: ${img.likes}</p>
        <p>Views: ${img.views}</p>
        <p>Comments: ${img.comments}</p>
        <p>Downloads: ${img.downloads}</p>
      </div>
    </li>
  `).join("");

  galleryElement.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  galleryElement.innerHTML = "";
}

export function showLoader() {
  document.querySelector(".loader").classList.remove("hidden");
}

export function hideLoader() {
  document.querySelector(".loader").classList.add("hidden");
}

export function showNoResultsToast() {
  iziToast.error({
    title: 'Oops!',
    message: 'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight'
  });
}