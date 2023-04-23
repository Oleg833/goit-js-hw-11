import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '34212854-f6457ae4e5e1013dd0f507693',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 40,
};

// async function pixabeyImage(param, page) {
//   const PIXA_URL = `https://pixabay.com/api/?key=34212854-f6457ae4e5e1013dd0f507693&q=${param}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

//   const { data } = await axios.get(PIXA_URL);

//   // console.log(`pixabeyImage response`, data);

//   return data;
// }

const pixabeyImage = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);

  // console.log(`pixabeyImage response`, data);

  return data;
};

export default pixabeyImage;
