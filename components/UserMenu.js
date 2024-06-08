/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
import { Dropdown } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function UserMenu() {
  const { user } = useAuth();
  const router = useRouter();

  const userProfile = () => {
    router.push('/profile');
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="dropdown border-none bg-transparent">
        <img src={user.photoURL} alt={`${user.displayName}`} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu rounded-lg">
        <Dropdown.Item onClick={userProfile}>Account info</Dropdown.Item>
        <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
