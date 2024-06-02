import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMedia } from '../api/mediaData';

export default function MediaCard({ mediaObj, onUpdate }) {
  const deleteThisMedia = () => {
    if (window.confirm(`Delete ${mediaObj.name}?`)) {
      deleteMedia(mediaObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={mediaObj.image_url} alt={mediaObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{mediaObj.name} {mediaObj.watched ? '✅' : ''}</Card.Title>
        <Link href={`/media/${mediaObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        <Link href={`/media/edit/${mediaObj.firebaseKey}`} passHref>
          <Button variant="info">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMedia} className="m-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

MediaCard.propTypes = {
  mediaObj: PropTypes.shape({
    image_url: PropTypes.string,
    name: PropTypes.string,
    watched: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
