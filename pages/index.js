import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import MediaCard from '../components/MediaCard';
import { getMedia } from '../api/mediaData';
import { useAuth } from '../utils/context/authContext';
import MediaFilter from '../components/MediaFilter';

export default function Home() {
  const { user } = useAuth();
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [filterSettings, setFilterSettings] = useState({ type: 'All', watched: null });

  useEffect(() => {
    if (user) {
      getMedia(user.uid).then((fetchedMedia) => {
        setMedia(fetchedMedia);
        setFilteredMedia(fetchedMedia);
      });
    }
  }, [user]);

  const filterMedia = (type = 'All', watched = null) => {
    setFilterSettings({ type, watched });
    let newMedia = media;
    if (type !== 'All') {
      newMedia = newMedia.filter((mediaObj) => mediaObj.type === type);
    }
    if (watched !== null) {
      newMedia = newMedia.filter((mediaObj) => mediaObj.watched === watched);
    }
    setFilteredMedia(newMedia);
  };

  const onUpdate = (updatedItem) => {
    const updatedMedia = media.map((item) => (item.firebaseKey === updatedItem.firebaseKey ? updatedItem : item));
    setMedia(updatedMedia);
    const { type, watched } = filterSettings;
    filterMedia(type, watched);
  };

  return (
    <>
      <Head>
        <title>Watchlistr</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="filter-container">
        <MediaFilter filterMedia={filterMedia} />
      </div>
      <div className="wrapper">
        <div className="media-container">
          {filteredMedia.map((mediaObj) => (
            <MediaCard key={mediaObj.firebaseKey} mediaObj={mediaObj} onUpdate={onUpdate} />
          ))}
        </div>
      </div>
    </>
  );
}
