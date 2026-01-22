import "./css/styles.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showNoResultsToast,
  showLoadMoreButton,
  hideLoadMoreButton
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  query = input.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showNoResultsToast();
    } else {
      createGallery(data.hits);

      if (page * perPage < totalHits) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    createGallery(data.hits, true);

   
    const cardHeight = document.querySelector(".gallery li").getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });

    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      import("izitoast").then(({ default: iziToast }) => {
        iziToast.info({
          title: "Info",
          message: "We're sorry, but you've reached the end of search results.",
          position: "topRight"
        });
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
});
