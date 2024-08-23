import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import MediaCard from '../components/MediaCard';
import { getMedia } from '../api/mediaData';
import { useAuth } from '../utils/context/authContext';
import SideBar from '../components/SideBar';

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

  useEffect(() => {
    getAllTheMedia();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Watchlistr</title>
      </Head>
      <div className="home-page">
        <SideBar filterMedia={filterMedia} />
        <div className="wrapper">
          <div className="content">
            {filteredMedia.map((mediaObj) => (
              <MediaCard key={mediaObj.firebaseKey} mediaObj={mediaObj} onUpdate={getAllTheMedia} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
