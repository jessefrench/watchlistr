import React from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function UserCard() {
  const { user } = useAuth();

  return (
    <Card className="user-card">
      <Card.Img className="user-img" variant="top" src={user.photoURL} />
      <Card.Body className="user-card-body">
        <Card.Title>{user.displayName}</Card.Title>
        <p className="card-text bold">Email: {user.email}</p>
        <p className="card-text bold">Last login: {user.metadata.lastSignInTime}</p>
      </Card.Body>
    </Card>
  );
}
