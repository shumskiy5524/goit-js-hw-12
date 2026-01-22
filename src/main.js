import "./css/styles.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showNoResultsToast 
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const input = form.querySelector('input[name="search-text"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  clearGallery();
  showLoader();

  try {
    const images = await getImagesByQuery(query);

    if (images.length === 0) {
      showNoResultsToast();
    } else {
      createGallery(images);
    }

  } catch (error) {
    console.error(error);
    import("izitoast").then(({ default: iziToast }) => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong while fetching images!',
        position: 'topRight'
      });
    });
  } finally {
    hideLoader();
  }
});
