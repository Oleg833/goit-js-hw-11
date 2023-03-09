import './css/styles.css';
import Notiflix from 'notiflix';
// npm i notiflix
import debounce from 'lodash.debounce';
// npm i --save lodash.debounce
// import throttle from 'lodash.throttle';
// import axios from 'axios';
// npm install axios

import pixabeyImage from './pixabeyImage';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const buttonFormEl = document.querySelector('button');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSubmitForm);
// searchForm.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));
searchForm.addEventListener('input', onFormInput);
loadMoreBtn.addEventListener('click', onLoadMoreClick);
