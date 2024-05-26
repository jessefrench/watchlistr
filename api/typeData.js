import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/type.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleType = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/type/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export { getTypes, getSingleType };
