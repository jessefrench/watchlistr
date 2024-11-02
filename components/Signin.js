import React from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import Image from 'next/image';
import { signIn } from '../utils/auth';

export default function Signin() {
  return (
    <>
      <Head>
        <title>Watchlistr</title>
      </Head>
      <div className="signin-page text-center d-flex flex-column justify-content-center align-content-center">
        <div className="logo">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={476}
            height={440}
            priority
          />
        </div>
        <h1>watchlistr</h1>
        <Button variant="dark" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </>
  );
}
