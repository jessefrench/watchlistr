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

const deleteMedia = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/media/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export { getMedia, deleteMedia };
