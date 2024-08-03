import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.img-list a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function renderPhotoes(photos, imgList) {
  const markup = photos.hits
    .map(photo => {
      return `<li class="gallery-item">
            <a class="gallery-link" href="${photo.largeImageURL}">
            <img
            class="gallery-img"
            src="${photo.webformatURL}"
            data-source="${photo.largeImageURL}"
            alt="${photo.tags}">
            </a>
            <div class="img-description">
              <p class="description-text">Likes <span class="description-value"> ${photo.likes}</span></p>
              <p class="description-text">Views <span class="description-value"> ${photo.views}</span></p>
              <p class="description-text">Comments <span class="description-value"> ${photo.comments}</span></p>
              <p class="description-text">Downloads <span class="description-value"> ${photo.downloads}</span></p>
            </div>
              </li>`;
    })
    .join('');

  imgList.insertAdjacentHTML('afterbegin', markup);

  gallery.on('show.simplelightbox', function () {});
  gallery.refresh();
}

export default renderPhotoes;
