/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMedia } from '../api/mediaData';
import MediaCard from '../components/MediaCard';

export default function Home() {
  const [media, setMedia] = useState([]);
  const { user } = useAuth();

  const getAllTheMedia = () => {
    getMedia(user.uid).then(setMedia);
  };

  useEffect(() => {
    getAllTheMedia();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {media.map((mediaObj) => (
          <MediaCard key={mediaObj.firebaseKey} mediaObj={mediaObj} onUpdate={getAllTheMedia} />
        ))}
      </div>
    </div>
  );
}
