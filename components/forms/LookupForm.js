/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createMedia, updateMedia } from '../../api/mediaData';
import { useAuth } from '../../utils/context/authContext';
import { fetchFromTVDB } from '../../api/tvdbData';

export default function LookupForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    const queryResults = await fetchFromTVDB(`/search?q=${query}`);
    setResults(queryResults.data);
  };

  const handleImageClick = async (item) => {
    const payload = {
      name: item.name,
      overview: item.overview,
      image_url: item.image_url,
      type_id: '',
      genre_id: '',
      network_id: '',
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
        {results.slice(0, 10).map((item) => (
          <li key={item.id}>
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.name}
                width={300}
                height={400}
                onClick={() => handleImageClick(item)}
              />
            ) : (
              <div
                style={{ width: 300, height: 400, backgroundColor: '#ccc' }}
                onClick={() => handleImageClick(item)}
              >
                No Image Available
              </div>
            )}
            <p>{item.name} ({item.year})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
