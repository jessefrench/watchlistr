import React from 'react';
import Head from 'next/head';
// import Image from 'next/image';
import UserCard from '../components/UserCard';

export default function Profile() {
  return (
    <>
      <Head>
        <title>watchlistr | Profile</title>
      </Head>
      <div className="user-page">
        <UserCard />
        {/* <p>TV and movie metadata provided by
          <Image
            src="/images/tmdb.svg"
            alt="TMDB"
            width={100}
            height={20}
            style={{ margin: '20px' }}
          />
        </p>
        <p>Streaming availability data provided by
          <Image
            src="/images/justwatch.png"
            alt="TMDB"
            width={120}
            height={20}
          />
        </p> */}
      </div>
    </>
  );
}
