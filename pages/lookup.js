import React from 'react';
import Head from 'next/head';
import LookupForm from '../components/forms/LookupForm';

const Lookup = () => (
  <>
    <Head>
      <title>Watchlistr | Lookup</title>
    </Head>
    <div style={{ width: '75%', margin: '0 auto', textAlign: 'center' }}>
      <h1>TV Show and Movie Lookup</h1>
      <LookupForm />
    </div>
  </>
);

export default Lookup;
