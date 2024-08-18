import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import { GrFormView } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { deleteMedia, updateMedia } from '../api/mediaData';

export default function MediaCard({ mediaObj, onUpdate }) {
  const [watched, setWatched] = useState(mediaObj.watched);

  const deleteThisMedia = () => {
    if (window.confirm(`Delete ${mediaObj.name}?`)) {
      deleteMedia(mediaObj.firebaseKey).then(() => onUpdate());
    }
  };

  const handleWatchedChange = (e) => {
    const newWatchedStatus = e.target.checked;
    setWatched(newWatchedStatus);
    updateMedia({ ...mediaObj, watched: newWatchedStatus }).then(() => {
      onUpdate();
    });
  };

  return (
    <Card className="media-card">
      <div className="watched-checkbox card-checkbox">
        <Form.Check
          type="checkbox"
          id={`watched-${mediaObj.firebaseKey}`}
          label=""
          checked={watched}
          onChange={handleWatchedChange}
        />
      </div>
      <Card.Img
        variant="top"
        src={mediaObj.image_url}
        alt={mediaObj.name}
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
