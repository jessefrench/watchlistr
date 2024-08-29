import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import { getMedia } from '../api/mediaData';

export default function ViewDirectorBasedOnUserAuthStatus({ component: Component, pageProps }) {
  const { user, userLoading } = useAuth();
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);

  useEffect(() => {
    if (user) {
      getMedia(user.uid).then((fetchedMedia) => {
        setMedia(fetchedMedia);
        setFilteredMedia(fetchedMedia);
      });
    }
  }, [user]);

  const filterMedia = (type = 'All', watched = null) => {
    let newMedia = media;
    if (type !== 'All') {
      newMedia = newMedia.filter((mediaObj) => mediaObj.type === type);
    }
    if (watched !== null) {
      newMedia = newMedia.filter((mediaObj) => mediaObj.watched === watched);
    }
    setFilteredMedia(newMedia);
  };

  // If user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // What the user should see if they are logged in
  if (user) {
    return (
      <>
        <NavBar filterMedia={filterMedia} /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">
          <Component {...pageProps} filteredMedia={filteredMedia} setFilteredMedia={setFilteredMedia} />
        </div>
      </>
    );
  }

  return <Signin />;
}

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
