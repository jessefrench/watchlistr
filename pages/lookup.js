import React from 'react';
import Head from 'next/head';
import LookupForm from '../components/forms/LookupForm';

export default function Lookup() {
  return (
    <>
      <Head>
        <title>Watchlistr | Lookup</title>
      </Head>
      <div className="lookup-page">
        <h1>TV Show and Movie Lookup</h1>
        <LookupForm />
      </div>
    </>
  );
}
