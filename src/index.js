import './css/styles.css';
import { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import pixabeyImage from './pixabeyImage';

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery');
const endCollection = document.querySelector('.end-collection');

searchForm.addEventListener('submit', onSubmitForm);

loadMoreBtn.addEventListener('click', onLoadMoreClick);

let page = 1;
let currentHits = 0;
let valueSearchQuery = '';

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
  animationSpeed: 250,
});

async function onSubmitForm(event) {
  event.preventDefault();
  currentHits = 0;
  clearElements();
  page = 1;

  valueSearchQuery = event.currentTarget.searchQuery.value.trim();
  if (valueSearchQuery === '') {
    return;
  }

  event.currentTarget.reset();

  const totalHits = await GetUsers(valueSearchQuery);
  if (totalHits) {
    successNotify(totalHits);
  }
}

async function GetUsers(valueSearchQuery) {
  try {
    const { hits, totalHits } = await pixabeyImage(valueSearchQuery, page);
    if (!hits.length) {
      throwError();
    } else {
      renderGallery(hits);
      // slowlyScroll();
      currentHits += hits.length;
      console.log('currentHits', currentHits);
      loadMoreBtnActive(totalHits);
      return totalHits;
    }
  } catch (error) {
    failureNotify(error);
  }
}

async function GetUsersBtn(valueSearchQuery) {
  try {
    const { hits, totalHits } = await pixabeyImage(valueSearchQuery, page);
    if (!hits.length) {
      throwError();
    } else {
      renderGallery(hits);
      slowlyScroll();
      currentHits += hits.length;
      console.log('currentHits', currentHits);
      loadMoreBtnActive(totalHits);
      return totalHits;
    }
  } catch (error) {
    failureNotify(error);
  }
}

function loadMoreBtnActive(totalHits) {
  if (currentHits < totalHits) {
    loadMoreBtn.classList.remove('is-hidden');
    endCollectionHidden();
  } else {
    endCollection.classList.remove('is-hidden');
    loadMoreBtnHidden();
  }
}
function failureNotify(error) {
  Notify.failure(`${error}`);
}
function successNotify(totalHits) {
  Notify.success(`Hooray! We  found ${totalHits}  images.`);
  console.log(`Hooray! We  found ${totalHits}  images.`);
}
function throwError() {
  throw new Error(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
function onLoadMoreClick(e) {
  page += 1;
  GetUsersBtn(valueSearchQuery);
  loadMoreBtnHidden();
}
function loadMoreBtnHidden() {
  loadMoreBtn.classList.add('is-hidden');
}
function endCollectionHidden() {
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

  gallery.refresh();
  // slowlyScroll();
}

function slowlyScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
function clearElements() {
  galleryContainer.innerHTML = '';
  loadMoreBtnHidden();
  endCollectionHidden();
}

// async function render(valueSearchQuery) {
//   return pixabeyImage(valueSearchQuery, page)
//     .then(({ hits, totalHits }) => {
//       if (!hits.length) {
//         throwError();
//       } else {
//         renderGallery(hits);
//         currentHits += hits.length;
//         console.log('currentHits', currentHits);
//         loadMoreBtnActive(totalHits);
//         return totalHits;
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       failureNotify(error);
//     });
// }

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
