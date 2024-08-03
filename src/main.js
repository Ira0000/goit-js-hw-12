import fetchImages from './js/pixabay-api.js';
import renderPhotoes from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const searchField = document.querySelector('.search-input');
const imgList = document.querySelector('.img-list');
// const photoesContainer = document.querySelector('.img-section');
const loadMoreBtn = document.querySelector('.load-more-btn');

// const downloadStatus = '<div class="loader"></div>';
// photoesContainer.insertAdjacentHTML('afterbegin', downloadStatus);
//   const loader = document.querySelector('.loader');

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
loadButton.hide();

searchForm.addEventListener('submit', handleSearch);
async function handleSearch(event) {
  event.preventDefault();

  imgList.innerHTML = '';

  const searchValue = searchField.value.trim();


  if (searchValue === '') {
    showErrorToastMessage('Please fill the search field!');
    return;
  } else {
    pageShown = 1;
 


    try {
      const response = await fetchImages(searchValue, pageShown, perPage);
      const photos = response.data.hits;
      const totalImages = response.data.total;

        maxPage = Math.ceil(totalImages / perPage);
        console.log(maxPage);

        if (totalImages > 0) {
          loadButton.show();
    loadButton.disable();
          renderPhotoes(photos, imgList);
        } else {
        showErrorToastMessage('Sorry, there are no images matching your search query. Please try again!');
        }
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
      event.currentTarget.reset();
    }
  }
}


async function handleLoadMore() {
  loadButton.disable();
  pageShown++;

  try {
    const response = await fetchImages(searchField.value.trim(), pageShown, perPage);
    const photos = response.data.hits;
    renderPhotoes(photos, imgList);
  } catch (err) {
    console.error(`Error during request: ${err.message}`);
  }
  finally{
    if (pageShown === maxPage) {
      loadButton.hide();
      loadMoreBtn.removeEventListener('click', handleLoadMore);
    } else {
      loadButton.enable();
    }
  }
}