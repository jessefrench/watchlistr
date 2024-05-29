/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function UserCard() {
  const { user } = useAuth();

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={user.photoURL} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{user.displayName}</Card.Title>
        <p className="card-text bold">Email: {user.email}</p>
        <p className="card-text bold">Last login: {user.metadata.lastSignInTime}</p>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    lastSignInTime: PropTypes.string,
  }).isRequired,
};
