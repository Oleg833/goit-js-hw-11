export default pixabeyImage;

import axios from 'axios';

async function pixabeyImage(param) {
  const BASE_URL = `https://restcountries.com/v3.1/name/${param}?fields=name,capital,population,flags,languages`;
  const PIXA_URL = `https://pixabay.com/api/?key=34212854-f6457ae4e5e1013dd0f507693&q=${param}&image_type=photo&orientation=horizontal&safesearch=true`;
  const PIXA_ORIG = `https://pixabay.com/api/?key=34212854-f6457ae4e5e1013dd0f507693&q=yellow+flowers&image_type=photo&pretty=true`;

  const response = await axios.get(PIXA_URL);
  // throw new Error(
  //   'Sorry, there are no images matching your search query. Please try again.'
  // );
  console.log(`pixabeyImage response`, response.data);
  return response.data;

  // try {
  //   const response = await axios.get(BASE_URL);
  //   console.log(response.data);
  //   return response.data;
  // } catch (error) {
  //   console.error(error);
  // }
}

// async function pixabeyImage(param) {
//   const BASE_URL = `https://restcountries.com/v3.1/name/${param}?fields=name,capital,population,flags,languages`;
//   // const URL_ASK = `https://restcountries.com/v2/name/${param}?fields=name,capital,currencies`;

//   const response = await fetch(BASE_URL);
//   console.log(response);
//   const res = await response.json();

//   return res;
// }

//   const sfsd = {
//     webformatURL,
//     largeImageURL,
//     tags,
//     likes,
//     views,
//     comments,
//     downloads,
//   };
