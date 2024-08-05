import fetchImages from './js/pixabay-api.js';
import renderPhotoes from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const searchField = document.querySelector('.search-input');
const imgList = document.querySelector('.img-list');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loaderDiv = document.querySelector('.loader');

function showErrorToastMessage(message) {
  iziToast.error({
    message: message,
    position: 'topRight',
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    iconColor: '#fff',
    icon: 'fa-regular fa-circle-xmark',
    progressBarColor: '#B51B1B',
    maxWidth: 432,
    messageSize: '16',
  });
}

let pageShown = 1;
const perPage = 15;
let maxPage;
let searchValue;

class ButtonService {
  constructor(buttonEL, hiddenClass) {
    this.buttonEL = buttonEL;
    this.hiddenClass = hiddenClass;
  }

  hide() {
    this.buttonEL.classList.add(this.hiddenClass);
  }

  show() {
    this.buttonEL.classList.remove(this.hiddenClass);
  }

  disable() {
    this.buttonEL.disabled = true;
  }

  enable() {
    this.buttonEL.disabled = false;
  }
}

const loadButton = new ButtonService(loadMoreBtn, "is-hidden")
const loader = new ButtonService(loaderDiv, "is-hidden");
loadButton.hide();
loader.hide();



searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  loadButton.hide();
  imgList.innerHTML = '';
  searchValue = searchField.value.trim();
  loader.show();

  if (searchValue === '') {
    loadButton.hide();
    loader.hide();
    showErrorToastMessage('Please fill the search field!');
    return;
  } else {
    pageShown = 1;
 
    try {
      const response = await fetchImages(searchValue, pageShown, perPage);
      // console.log(response)
      const photos = response.data.hits;
      const totalImages = response.data.totalHits;

        maxPage = Math.ceil(totalImages / perPage);
        // console.log(maxPage);

        if (totalImages > 0) {
          loadButton.show();
          loadButton.disable();
          renderPhotoes(photos, imgList);
          loader.hide();
        } else {
        loader.hide();
        showErrorToastMessage('Sorry, there are no images matching your search query. Please try again!');
        loadButton.hide();}
        if (maxPage > 1) {
          loadButton.enable();
          loadMoreBtn.addEventListener('click', handleLoadMore);
        } else {
          loadButton.hide();
        }
      } 
      catch (err) {
      console.log(`Помилка під час запиту: ${err.message}`);
    } finally {
      event.target.reset();
    }
  }
}


async function handleLoadMore() {
  loadButton.disable();
  pageShown = pageShown + 1;
  loader.show();

  try {
    const response = await fetchImages(searchValue, pageShown, perPage);
    const photos = response.data.hits;
    renderPhotoes(photos, imgList);
    let imgContainer = document.querySelector('.gallery-item');
    let imgContainerProperties = imgContainer.getBoundingClientRect()
      window.scrollBy({
        top: (2 * imgContainerProperties.height),
        behavior: "smooth",
      })
    loader.hide();
  } catch (err) {
    console.error(`Error during request: ${err.message}`);
  }
  finally{
    if (pageShown === maxPage) {
      loadButton.hide();
      loadMoreBtn.removeEventListener('click', handleLoadMore);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#8AC7DB',
        messageColor: '#000',
        iconColor: '#000',
        icon: 'fa-solid fa-circle-info',
        progressBarColor: '#B51B1B',
        maxWidth: 432,
        messageSize: '16',
      });

    } else {
      loadButton.enable();
    }
  }
}

