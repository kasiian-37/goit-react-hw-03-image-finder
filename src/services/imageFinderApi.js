function fetchPictures(query, page) {
  const BASE_URL = "https://pixabay.com/api/";
  const API_KEY = "19182122-b959857203510615d63e1aa25";
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=15&key=${API_KEY}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("Something is wrong, please try again"));
  });
}

const API = {
  fetchPictures,
};

export default API;
