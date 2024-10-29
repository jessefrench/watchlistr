import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import MediaCard from '../components/MediaCard';

export default function Home({ filteredMedia, setFilteredMedia }) {
  return (
    <>
      <Head>
        <title>Watchlistr</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
  filteredMedia: PropTypes.arrayOf(PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    watched: PropTypes.bool.isRequired,
  })).isRequired,
  setFilteredMedia: PropTypes.func.isRequired,
};
