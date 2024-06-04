import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MediaForm from '../../../components/forms/MediaForm';
import { getSingleMedia } from '../../../api/mediaData';

export default function EditMedia() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMedia(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>WATCHLISTR | Edit</title>
      </Head>
      <MediaForm obj={editItem} />
    </>
  );
}
