// const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TMDB_API_URL;
const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH;

// const fetchFromTMDB = async (endpoint) => {
//   const response = await fetch(`${apiUrl}${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = response.json();
//   console.warn(Object.values(data));
//   return Object.values(data);
// };

const fetchFromTMDB = (query) => new Promise((resolve, reject) => {
  fetch(`${apiUrl}/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default fetchFromTMDB;
