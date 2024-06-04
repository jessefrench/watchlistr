import React from 'react';
import Head from 'next/head';
import UserCard from '../components/UserCard';

export default function Profile() {
  return (
    <>
      <Head>
        <title>WATCHLISTR | Profile</title>
      </Head>
      <div className="flex justify-center">
        <div className="mt-32">
          <UserCard />
        </div>
      </div>
    </>
  );
}
