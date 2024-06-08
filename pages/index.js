/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getMedia } from '../api/mediaData';
import MediaCard from '../components/MediaCard';

export default function Home() {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const { user } = useAuth();

  const getAllTheMedia = () => {
    getMedia(user.uid).then((fetchedMedia) => {
      setMedia(fetchedMedia);
      setFilteredMedia(fetchedMedia);
    });
  };

  const filterMedia = (typeID = 'All', watched = null) => {
    let newMedia = media;
    if (typeID !== 'All') {
      newMedia = newMedia.filter((mediaObj) => mediaObj.type_id === typeID);
    }
    if (watched !== null) {
      newMedia = newMedia.filter((mediaObj) => mediaObj.watched === watched);
    }
    setFilteredMedia(newMedia);
  };

  useEffect(() => {
    getAllTheMedia();
  }, []);

  return (
    <>
      <Head>
        <title>watchlistr</title>
      </Head>
      <div className="home-page">
        <div className="sidebar">
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('All')}>All</Button>
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('-NykRyvClr3y0a0B64Fk')}>Movies</Button>
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('-NykRyvClr3y0a0B64Fl')}>TV Shows</Button>
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('All', true)}>Watched</Button>
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('All', false)}>Unwatched</Button>
        </div>
        <div className="content">
          {filteredMedia.map((mediaObj) => (
            <MediaCard key={mediaObj.firebaseKey} mediaObj={mediaObj} onUpdate={getAllTheMedia} />
          ))}
        </div>
      </div>
    </>
  );
}
