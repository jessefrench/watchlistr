import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMedia = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/media.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleMedia = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/media/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteMedia = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/media/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createMedia = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/media.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMedia = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/media/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const searchMedia = async (searchValue, uid) => {
  const allMedia = await getMedia(uid);

  const filteredMedia = await allMedia.filter((media) => (
    (media.name && media.name.toLowerCase().includes(searchValue.toLowerCase()))
    || (media.overview && media.overview.toLowerCase().includes(searchValue.toLowerCase()))
  ));

  return filteredMedia;
};

export {
  getMedia, getSingleMedia, deleteMedia, createMedia, updateMedia, searchMedia,
};
