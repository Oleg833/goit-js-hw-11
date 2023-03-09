import './css/styles.css';
import Notiflix from 'notiflix';
// npm i notiflix
// import debounce from 'lodash.debounce';
// npm i --save lodash.debounce
// import throttle from 'lodash.throttle';
import axios from 'axios';
// npm install axios

import pixabeyImage from './pixabeyImage';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const buttonFormEl = document.querySelector('button');
const loadMoreBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSubmitForm);
// searchForm.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));
// searchForm.addEventListener('input', onFormInput);
// loadMoreBtn.addEventListener('click', onLoadMoreClick);

function onSubmitForm(event) {
  event.preventDefault();

  const valueSearchQuery =
    event.currentTarget.elements.searchQuery.value.trim();
  console.log(valueSearchQuery);

  // pixabeyImage('peru').then(users => console.log(users));

  // pixabeyImage(valueSearchQuery)
  //   .then(users => {
  //     if (users.length > 20) {
  //       clearElements();
  //       Notiflix.Notify.info(
  //         'Too many matches found. Please enter a more specific name.'
  //       );
  //       return users;
  //     }
  //     if (users.length === 1) {
  //       countryList.innerHTML = '';
  //       renderUserList(users);
  //       return users;
  //     }
  //     countryInfo.innerHTML = '';
  //     fastRender(users);
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
  //     Notiflix.Notify.failure(
  //       'Sorry, there are no images matching your search query. Please try again.'
  //     );
  //   });

  // event.currentTarget.reset();
}

pixabeyImage('peru')
  .then(users => console.log(users))
  .catch(error => {
    clearElements();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  });

function clearElements() {
  console.log(`Brr`);
  galleryEl.innerHTML = '';
}
