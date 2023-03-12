import './css/styles.css';
import { Notify } from 'notiflix';
// npm i notiflix
// import debounce from 'lodash.debounce';
// npm i --save lodash.debounce
// import throttle from 'lodash.throttle';
import axios from 'axios';
// npm install axios
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import pixabeyImage from './pixabeyImage';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const buttonFormEl = document.querySelector('button');
const loadMoreBtn = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery');
const endCollection = document.querySelector('.end-collection');

searchForm.addEventListener('submit', onSubmitForm);
// searchForm.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));
// searchForm.addEventListener('input', onFormInput);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

let page = 1;
let pagelimit = 40;
let totalPages = 1;
let currentHits = 0;
let currentPage = 1;
let valueSearchQuery = '';

function onSubmitForm(event) {
  event.preventDefault();
  currentHits = 0;

  valueSearchQuery = event.currentTarget.searchQuery.value.trim();
  if (valueSearchQuery === '') {
    return;
  }
  // console.log(valueSearchQuery);
  clearElements();

  render(valueSearchQuery, page);

  event.currentTarget.reset();
}

function render(valueSearchQuery, page) {
  pixabeyImage(valueSearchQuery, page)
    .then(({ hits, totalHits }) => {
      if (!hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We  found ${totalHits}  images.`);
        console.log(`Hooray! We  found ${totalHits}  images.`);
        renderGallery(hits);
        currentHits += hits.length;
        console.log('currentHits', currentHits);
        if (currentHits < totalHits) {
          loadMoreBtn.classList.remove('is-hidden');
        }
        if (currentHits === totalHits) {
          endCollection.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function onLoadMoreClick(e) {
  console.log(currentPage);
  // pixabeyImage(valueSearchQuery, currentPage);
  loadMoreBtn.classList.add('is-hidden');
  endCollection.classList.add('is-hidden');
}
function renderGallery(users) {
  const gallaryMarkup = users
    .map(
      ({
        webformatURL,
        fullHDURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a href="${fullHDURL}" class="gallery__item"
        ><div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>${likes}</p>
              <p class="info-item">
                <b>Views</b>${views}</p>
              <p class="info-item">
                <b>Comments</b>${comments}</p>
              <p class="info-item">
                <b>Downloads</b>${downloads}</p>
            </div>
          </div>      
      </a>`
    )
    .join('');

  // galleryContainer.innerHTML = gallaryMarkup;
  galleryContainer.insertAdjacentHTML('beforeend', gallaryMarkup);

  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionsDelay: 250,
    animationSpeed: 250,
  });
  gallery.refresh();
}

function clearElements() {
  // console.log(`clearElements()`);
  galleryContainer.innerHTML = '';
}

// function openModal() {
//   loadMoreBtn.classList.remove('is-hidden');
//   document.addEventListener('keydown', onEscPress);
// }

// function onEscPress(evt) {
//   console.log(evt.key, evt.code);
//   if (evt.code === 'Escape') {
//     closeModal();
//   }
// }
// function closeModal() {
//   loadMoreBtn.classList.add('is-hidden');
//   // document.removeEventListener('keydown', onEscPress);
// }

// function renderUserList(users) {
//   const markup = users
//     .map(
//       ({
//         webformatURL,
//         fullHDURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<li>
//       <img src="${webformatURL}"  alt="${tags}">
//       <p>
//           <b>likes</b>: ${likes}</p>
//           <p><b>views</b>: ${views}</p>
//           <p><b>comments</b>: ${comments}</p>
//           <p><b>downloads</b>: ${downloads}</p>
//         </li>`;
//         ``;
//       }
//     )
//     .join('');
//   galleryContainer.innerHTML = markup;
// }

// pixabeyImage(valueSearchQuery)
//   .then(users => {
//     if (users.length > 20) {
//       clearElements();
//       Notify.info(
//         'Too many matches found. Please enter a more specific name.'
//       );
//       return users;
//     }
//     if (users.length === 1) {
//       galleryContainer.innerHTML = '';
//       renderUserList(users);
//       return users;
//     }
//     galleryContainer.innerHTML = '';
//     renderUserList(users);
//     console.log(`Found:`, users.length, `country`);
//     return users;
//   })
//   .then(res => {
//     console.log(`Found Country[0]`, res[0]);
//     console.log(
//       `Country name:`,
//       res[0].name.official,
//       ` Capital:`,
//       Object.values(res[0].capital).join(', '),
//       ` Population:`,
//       res[0].population,
//       ` languages:`,
//       Object.values(res[0].languages).join(', ')
//     );
//   })
//   .catch(error => {
//     clearElements();
//     console.log(error);
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   });
