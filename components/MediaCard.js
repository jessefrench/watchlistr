import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import { GrFormView } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { deleteMedia } from '../api/mediaData';

export default function MediaCard({ mediaObj, onUpdate }) {
  const deleteThisMedia = () => {
    if (window.confirm(`Delete ${mediaObj.name}?`)) {
      deleteMedia(mediaObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px', position: 'relative' }} className="media-card">
      {mediaObj.watched && (
        <div className="check-icon">
          <FaCheckCircle />
        </div>
      )}
      <Card.Img
        variant="top"
        src={mediaObj.image_url}
        alt={mediaObj.name}
        style={{ height: '400px' }}
      />
      <div className="card-body-container">
        <Card.Body className="card-body">
          <Card.Title>{mediaObj.name}</Card.Title>
          <Link href={`/media/${mediaObj.firebaseKey}`} passHref>
            <Button variant="outline-light">
              <GrFormView />
            </Button>
          </Link>
          <Link href={`/media/edit/${mediaObj.firebaseKey}`} passHref>
            <Button variant="outline-light">
              <CiEdit />
            </Button>
          </Link>
          <Button variant="outline-light" onClick={deleteThisMedia}>
            <MdDelete />
          </Button>
        </Card.Body>
      </div>
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
