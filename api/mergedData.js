import { getSingleGenre } from './genreData';
import { getSingleMedia } from './mediaData';
import { getSingleNetwork } from './networkData';
import { getSingleType } from './typeData';

const viewMediaDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleMedia(firebaseKey)
    .then((mediaObj) => {
      const genrePromise = getSingleGenre(mediaObj.genre_id);
      const networkPromise = getSingleNetwork(mediaObj.network_id);
      const typePromise = getSingleType(mediaObj.type_id);

      Promise.all([genrePromise, networkPromise, typePromise])
        .then(([genreObj, networkObj, typeObj]) => {
          resolve({
            genreObj, networkObj, typeObj, ...mediaObj,
          });
        })
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
});

export default viewMediaDetails;
