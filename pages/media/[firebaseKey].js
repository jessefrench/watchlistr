/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import Head from 'next/head';
import viewMediaDetails from '../../api/mergedData';

export default function ViewMedia() {
  const [mediaDetails, setMediaDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewMediaDetails(firebaseKey).then(setMediaDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>WATCHLISTR | Details</title>
      </Head>
      <Container>
        <Row>
          <Col sm={4}>
            <img src={mediaDetails.image_url} alt={mediaDetails.name} style={{ width: '300px' }} />
          </Col>
          <Col sm={8} className="text-white">
            <h1>{mediaDetails.name}</h1>
            <h6>
              {mediaDetails.typeObj?.name}---
              {mediaDetails.genreObj?.name}---
              {mediaDetails.networkObj?.name}---
              {mediaDetails.watched ? '✅' : ''}
            </h6>
            <p>{mediaDetails.overview || ''}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
