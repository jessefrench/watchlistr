/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createMedia, updateMedia } from '../../api/mediaData';
import { useAuth } from '../../utils/context/authContext';
// import { fetchFromTVDB } from '../../api/tvdbData';
import fetchFromTMDB from '../../api/tmdbData';

export default function LookupForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const imagePathPrefix = 'https://image.tmdb.org/t/p/w500';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    const queryResults = await fetchFromTMDB(query);
    setResults(queryResults.results);
  };

  const handleClick = async (item) => {
    const payload = {
      id: item.id,
      name: item.name,
      image_url: `${imagePathPrefix}${item.poster_path}`,
      type: item.media_type,
      watched: false,
      uid: user.uid,
    };
    try {
      await createMedia(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMedia(patchPayload).then(() => {
          router.push('/');
        });
      });
      alert('Media added successfully!');
    } catch (error) {
      alert('Error adding media.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a TV show or movie"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((item) => (
          <li key={item.id}>
            {item.poster_path ? (
              <Image
                src={`${imagePathPrefix}${item.poster_path}`}
                alt={item.name}
                width={300}
                height={400}
                onClick={() => handleClick(item)}
              />
            ) : (
              <div
                style={{ width: 300, height: 400, backgroundColor: '#ccc' }}
                onClick={() => handleClick(item)}
              >
                No Image Available
              </div>
            )}
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
