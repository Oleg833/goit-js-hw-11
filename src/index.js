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
  // console.log(valueSearchQuery);

  // pixabeyImage(valueSearchQuery)
  //   .then(users => console.log(users))
  //   .catch(error => {
  //     console.log(error);
  //   });

  pixabeyImage(valueSearchQuery)
    .then(users => {
      if (users.length > 20) {
        clearElements();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return users;
      }
      if (users.length === 1) {
        galleryEl.innerHTML = '';
        renderUserList(users);
        return users;
      }
      galleryEl.innerHTML = '';
      renderUserList(users);
      console.log(`Found:`, users.length, `country`);
      return users;
    })
    .then(res => {
      console.log(`Found Country[0]`, res[0]);
      console.log(
        `Country name:`,
        res[0].name.official,
        ` Capital:`,
        Object.values(res[0].capital).join(', '),
        ` Population:`,
        res[0].population,
        ` languages:`,
        Object.values(res[0].languages).join(', ')
      );
    })
    .catch(error => {
      clearElements();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });

  event.currentTarget.reset();
}

function renderUserList(users) {
  const markup = users
    .map(user => {
      return `<li>      
      <p>
      <img src="${user.flags.png}" width="40" alt="png">
          <b>Country name</b>: ${user.name.official}</p>
          <p><b>Capital</b>: ${Object.values(user.capital).join(', ')}</p>
          <p><b>Population</b>: ${user.population}</p>
          <p><b>languages</b>: ${Object.values(user.languages).join(', ')}</p>
        </li>`;
    })
    .join('');
  galleryEl.innerHTML = markup;
}

function clearElements() {
  console.log(`clearElements()`);
  galleryEl.innerHTML = '';
}
