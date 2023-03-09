export default pixabeyImage;

import axios from 'axios';

async function pixabeyImage(param) {
  const BASE_URL = `https://restcountries.com/v3.1/name/${param}?fields=name,capital,population,flags,languages`;
  const PIXA_URL = `https://pixabay.com/api/?key=34212854-f6457ae4e5e1013dd0f507693&q=${param}&image_type=photo&orientation=horizontal&safesearch=true`;
  const PIXA_ORIG = `https://pixabay.com/api/?key=34212854-f6457ae4e5e1013dd0f507693&q=yellow+flowers&image_type=photo&pretty=true`;
  const sfsd = {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  };

  try {
    const response = await axios.get(PIXA_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
