/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Badge, Col, Container, Row,
} from 'react-bootstrap';
import Head from 'next/head';
import ReactElasticCarousel from 'react-elastic-carousel';
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

  function capitalizeFirstLetter(mediaType) {
    if (!mediaType) return mediaType;
    return mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
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
        <title>watchlistr | Details</title>
      </Head>
      <Container>
        <Row>
          <Col sm={4}>
            <img
              src={`https://image.tmdb.org/t/p/w500${mediaDetails.poster_path}`}
              alt={mediaDetails.name || mediaDetails.title}
              style={{ width: '300px' }}
            />
          </Col>
          <Col sm={8} className="text-white">
            <h1>{mediaDetails.name || mediaDetails.title}</h1>
            <h6>
              <Badge bg="secondary" className="me-1">{capitalizeFirstLetter(firebaseData.type)}</Badge>
              <Badge bg="secondary" className="me-1">
                {mediaDetails.genres?.map((genre) => genre.name).join(', ')}
              </Badge>
              <Badge bg="secondary" className="me-1">{mediaDetails.status}</Badge>
              <Badge bg="secondary" className="me-1">{streamingService}</Badge>
              <Badge bg="secondary">{firebaseData.watched ? 'Watched ✅' : ''}</Badge>
            </h6>
            <p>{mediaDetails.overview || ''}</p>
            <ReactElasticCarousel breakPoints={breakPoints}>
              {castList.map((member) => (
                <div key={member.cast_id} style={{ width: '150px', textAlign: 'center', marginRight: '10px' }}>
                  <div style={{ padding: '10px' }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                      alt={member.name}
                      style={{
                        borderRadius: '50%',
                        height: '150px',
                        width: '150px',
                        objectFit: 'cover',
                        margin: '0 auto',
                      }}
                    />
                    <h5>{member.name}</h5>
                    <p>{member.character}</p>
                  </div>
                </div>
              ))}
            </ReactElasticCarousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}
