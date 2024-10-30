import React from 'react';
import { useRouter } from 'next/router';
import { Dropdown } from 'react-bootstrap';
import Image from 'next/image';
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
      <Dropdown.Toggle className="user-dropdown-toggle" variant="link">
        <Image
          src={user.photoURL}
          alt={`${user.displayName}`}
          width={35}
          height={35}
          className="rounded"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className="user-dropdown-menu">
        <Dropdown.Item onClick={userProfile}>Profile</Dropdown.Item>
        <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
