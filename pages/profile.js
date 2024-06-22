import React from 'react';
import Head from 'next/head';
import UserCard from '../components/UserCard';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Watchlistr | Profile</title>
      </Head>
      <div className="user-page">
        <UserCard />
      </div>
    </>
  );
}
