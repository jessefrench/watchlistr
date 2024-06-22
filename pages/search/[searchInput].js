/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { searchMedia } from '../../api/mediaData';
import MediaCard from '../../components/MediaCard';

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();

  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchResults = async () => {
    const filteredResults = await searchMedia(searchInput, user.uid);
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    getSearchResults();
  }, [searchInput, user.uid]);

  return (
    <>
      <Head>
        <title>Watchlistr | Search</title>
      </Head>
      <div className="d-flex flex-wrap">
        {searchResults.length === 0
          ? (<h1>No media found.</h1>)
          : (searchResults.map((results) => (
            <MediaCard key={results.firebaseKey} mediaObj={results} onUpdate={getSearchResults} />)))}
      </div>
    </>
  );
}
