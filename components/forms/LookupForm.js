import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Spinner } from 'react-bootstrap';
import { createMedia, updateMedia } from '../../api/mediaData';
import { useAuth } from '../../utils/context/authContext';
import { searchMediaFromTMDB } from '../../api/tmdbData';

export default function LookupForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const imagePathPrefix = 'https://image.tmdb.org/t/p/w500';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const queryResults = await searchMediaFromTMDB(query);
      setResults(queryResults.results);
    } catch (error) {
      alert('Error fetching results.');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (item) => {
    const userConfirmed = window.confirm(`Add ${item.name || item.title} to watchlist?`);
    if (!userConfirmed) {
      return;
    }
    const payload = {
      id: item.id,
      name: item.name || item.title,
      overview: item.overview,
      image_url: `${imagePathPrefix}${item.poster_path}`,
      type: item.media_type,
      watched: false,
      uid: user.uid,
    };
    try {
      const { name } = await createMedia(payload);
      const patchPayload = { firebaseKey: name };
      await updateMedia(patchPayload);
      router.push('/');
    } catch (error) {
      alert('Error adding media.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="lookup-form d-flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a TV show or movie"
          aria-label="Search for a TV show or movie"
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-secondary">Search</button>
      </form>
      {loading && <Spinner animation="border" />}
      <ul className="list-unstyled">
        {results.map((item) => (
          <li key={item.id} className="mb-4">
            {item.poster_path ? (
              <Card className="lookup-card">
                <Card.Img className="lookup-img" variant="left" src={`${imagePathPrefix}${item.poster_path}`} />
                <Card.Body className="lookup-body">
                  <Card.Title className="lookup-title">{item.name || item.title}</Card.Title>
                  <Card.Text className="lookup-text">{item.overview}</Card.Text>
                  <Button variant="secondary" onClick={() => handleClick(item)}>Add to watchlist</Button>
                </Card.Body>
              </Card>
            ) : (
              <Card className="lookup-card">
                <div className="placeholder-image">
                  <Card.Img src="/images/logo.png" alt="Logo" className="placeholder-logo" />
                  <p className="placeholder-text">No image available</p>
                </div>
                <Card.Body className="lookup-body">
                  <Card.Title className="lookup-title">{item.name || item.title}</Card.Title>
                  <Card.Text className="lookup-text">{item.overview}</Card.Text>
                  <Button variant="secondary" onClick={() => handleClick(item)}>Add to watchlist</Button>
                </Card.Body>
              </Card>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
