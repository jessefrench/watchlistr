/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { TbMovie } from 'react-icons/tb';
import { PiTelevisionSimpleBold } from 'react-icons/pi';
import { FaBars, FaHome } from 'react-icons/fa';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import MediaCard from '../components/MediaCard';
import { getMedia } from '../api/mediaData';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    getAllTheMedia();
  }, []);

  return (
    <>
      <Head>
        <title>Watchlistr</title>
      </Head>
      <div className="home-page">
        <button type="button" aria-label="sidebar-btn" className="sidebar-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('All')}>
            <FaHome className="filter-btn-icons" /> All
          </Button>
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('movie')}>
            <TbMovie className="filter-btn-icons" /> Movies
          </Button>
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('tv')}>
            <PiTelevisionSimpleBold className="filter-btn-icons" /> TV Shows
          </Button>
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('All', true)}>
            <ImCheckboxChecked className="filter-btn-icons" /> Watched
          </Button>
          <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('All', false)}>
            <ImCheckboxUnchecked className="filter-btn-icons" /> Unwatched
          </Button>
        </div>
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
