import React from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import Image from 'next/image';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <Head>
        <title>WATCHLISTR</title>
      </Head>
      <div
        className="signin-page text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <Image src="/images/logo.png" alt="Logo" />
        <h1>WATCHLISTR</h1>
        <Button type="button" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </>
  );
}

export default Signin;
