function fetchImages(searchValue, photoesContainer) {
  const searchParams = new URLSearchParams({
    key: '45153931-2470322a6efc3ba9ceddb2cb4',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: searchValue,
  });

  let url = `https://pixabay.com/api/?${searchParams}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default fetchImages;
