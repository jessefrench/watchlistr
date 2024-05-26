import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getNetworks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/network.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleNetwork = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/network/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export { getNetworks, getSingleNetwork };
