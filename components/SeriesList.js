/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import fetchFromTVDB from '../api/tvdbData';

const SeriesList = () => {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSeries = async () => {
      try {
        const data = await fetchFromTVDB('/series');
        setSeries(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSeries();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>TV Shows</h1>
      <ul>
        {series.map((seriesObj) => (
          <li key={seriesObj.id}>{seriesObj.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SeriesList;
