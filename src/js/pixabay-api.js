// import axios from 'axios';

// const myApiKey = '45153931-2470322a6efc3ba9ceddb2cb4';
// axios.defaults.baseURL = 'https://pixabay.com';

function fetchImages(searchValue, pageShown, perPage) {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '45153931-2470322a6efc3ba9ceddb2cb4',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q: searchValue,
      per_page: perPage,
      page: pageShown,
    },
  });
}

export default fetchImages;
