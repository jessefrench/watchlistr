import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Badge, Col, Container, Row,
} from 'react-bootstrap';
import Head from 'next/head';
import ReactElasticCarousel from 'react-elastic-carousel';
import ReactStars from 'react-stars';
import Image from 'next/image';
import { getSingleMedia } from '../../api/mediaData';
import {
  getMovieCastListFromTMDB,
  getMovieDetailsFromTMDB,
  getMovieStreamingServiceFromTMDB,
  getTvCastListFromTMDB,
  getTvDetailsFromTMDB,
  getTvStreamingServiceFromTMDB,
} from '../../api/tmdbData';

export default function ViewMedia() {
  const [mediaDetails, setMediaDetails] = useState({});
  const [streamingService, setStreamingService] = useState('');
  const [castList, setCastList] = useState([]);
  const [firebaseData, setFirebaseData] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  function handleCapitalization(mediaType) {
    if (!mediaType) {
      return mediaType;
    }
    return mediaType.length > 2
      ? mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
      : mediaType.toUpperCase();
  }

  useEffect(() => {
    if (firebaseKey) {
      getSingleMedia(firebaseKey).then((data) => {
        setFirebaseData(data);
        if (data.type === 'movie') {
          getMovieDetailsFromTMDB(data.id).then(setMediaDetails);
          getMovieStreamingServiceFromTMDB(data.id).then(setStreamingService);
          getMovieCastListFromTMDB(data.id).then(setCastList);
        } else if (data.type === 'tv') {
          getTvDetailsFromTMDB(data.id).then(setMediaDetails);
          getTvStreamingServiceFromTMDB(data.id).then(setStreamingService);
          getTvCastListFromTMDB(data.id).then(setCastList);
        }
      });
    }
  }, [firebaseKey]);

  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
  ];

  return (
    <>
      <Head>
        <title>Watchlistr | Details</title>
      </Head>
      <Container className="details d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col sm={4} className="d-flex justify-content-center">
            <div className="mb-3">
              {mediaDetails.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${mediaDetails.poster_path}`}
                  alt={mediaDetails.name || 'Media image'}
                  width={300}
                  height={500}
                  className="rounded-2"
                  priority
                />
              ) : (
                <div className="placeholder-poster">
                  <p>No image available</p>
                </div>
              )}
            </div>
          </Col>
          <Col sm={8} className="text-white">
            <h1>{mediaDetails.name || mediaDetails.title}</h1>
            {firebaseData.rating ? (
              <ReactStars
                className="mb-2"
                count={5}
                size={24}
                value={firebaseData.rating}
                color2="#ffd700"
                edit={false}
              />
            ) : ''}
            <p>{firebaseData.comments}</p>
            <div className="mb-3">
              <Badge bg="secondary" className="me-2">{handleCapitalization(firebaseData.type)}</Badge>
              <Badge bg="secondary" className="me-2">
                {mediaDetails.genres?.map((genre) => genre.name).join(', ')}
              </Badge>
              <Badge bg="secondary" className="me-2">{mediaDetails.status}</Badge>
              <Badge bg="secondary" className="me-2">{streamingService}</Badge>
              <Badge bg="secondary" className="me-2">{firebaseData.watched ? 'Watched ✅' : ''}</Badge>
            </div>
            <p>{mediaDetails.overview || ''}</p>
            <div className="mt-5">
              <h4>Cast</h4>
              <ReactElasticCarousel breakPoints={breakPoints}>
                {castList.map((member) => (
                  <div key={member.id} className="cast-card text-center me-3">
                    <div className="p-3">
                      {member.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                          alt={member.name}
                          width={150}
                          height={150}
                          className="cast-img"
                        />
                      ) : (
                        <div className="placeholder-cast-img bg-secondary d-flex align-items-center justify-content-center text-white">
                          No image available
                        </div>
                      )}
                      <h6 className="mt-2">{member.name}</h6>
                      <p>{member.character}</p>
                    </div>
                  </div>
                ))}
              </ReactElasticCarousel>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
