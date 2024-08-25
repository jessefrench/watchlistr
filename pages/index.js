import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import MediaCard from '../components/MediaCard';

export default function Home({ filteredMedia, setFilteredMedia }) {
  return (
    <>
      <Head>
        <title>Watchlistr</title>
      </Head>
      <div className="wrapper">
        <div className="media-container">
          {filteredMedia.map((mediaObj) => (
            <MediaCard key={mediaObj.firebaseKey} mediaObj={mediaObj} onUpdate={() => setFilteredMedia(filteredMedia)} />
          ))}
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
  filteredMedia: PropTypes.func.isRequired,
  setFilteredMedia: PropTypes.func.isRequired,
};
