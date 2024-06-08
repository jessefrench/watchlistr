import React from 'react';
import Head from 'next/head';
import MediaForm from '../../components/forms/MediaForm';

export default function AddMedia() {
  return (
    <>
      <Head>
        <title>watchlistr | New</title>
      </Head>
      <MediaForm />
    </>
  );
}
