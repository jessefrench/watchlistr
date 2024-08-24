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
      <div className="content">
        {filteredMedia.map((mediaObj) => (
          <MediaCard key={mediaObj.firebaseKey} mediaObj={mediaObj} onUpdate={() => setFilteredMedia(filteredMedia)} />
        ))}
      </div>
    </>
  );
}

Home.propTypes = {
  filteredMedia: PropTypes.func.isRequired,
  setFilteredMedia: PropTypes.func.isRequired,
};
