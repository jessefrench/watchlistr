const apiUrl = process.env.NEXT_PUBLIC_TMDB_API_URL;
const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH;

const searchMediaFromTMDB = (query) => new Promise((resolve, reject) => {
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

const getTvDetailsFromTMDB = (id) => new Promise((resolve, reject) => {
  fetch(`${apiUrl}/tv/${id}?language=en-US`, {
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

const getMovieDetailsFromTMDB = (id) => new Promise((resolve, reject) => {
  fetch(`${apiUrl}/movie/${id}?language=en-US`, {
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

const getTvStreamingServiceFromTMDB = (id) => new Promise((resolve, reject) => {
  fetch(`${apiUrl}/tv/${id}/watch/providers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data?.results?.US?.flatrate?.length > 0) {
        const usProviderName = data.results.US.flatrate[0].provider_name;
        resolve(usProviderName);
      } else {
        resolve(null);
      }
    })
    .catch((error) => {
      reject(error);
    });
});

const getMovieStreamingServiceFromTMDB = (id) => new Promise((resolve, reject) => {
  fetch(`${apiUrl}/movie/${id}/watch/providers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data?.results?.US?.flatrate?.length > 0) {
        const usProviderName = data.results.US.flatrate[0].provider_name;
        resolve(usProviderName);
      } else {
        resolve(null);
      }
    })
    .catch((error) => {
      reject(error);
    });
});

const getTvCastListFromTMDB = (id) => new Promise((resolve, reject) => {
  fetch(`${apiUrl}/tv/${id}/credits`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const actors = data.cast.filter((member) => member.known_for_department === 'Acting');
      resolve(actors);
    })
    .catch(reject);
});

const getMovieCastListFromTMDB = (id) => new Promise((resolve, reject) => {
  fetch(`${apiUrl}/movie/${id}/credits`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const actors = data.cast.filter((member) => member.known_for_department === 'Acting');
      resolve(actors);
    })
    .catch(reject);
});

export {
  searchMediaFromTMDB,
  getTvDetailsFromTMDB,
  getTvStreamingServiceFromTMDB,
  getMovieDetailsFromTMDB,
  getMovieStreamingServiceFromTMDB,
  getTvCastListFromTMDB,
  getMovieCastListFromTMDB,
};
