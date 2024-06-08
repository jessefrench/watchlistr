import React from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import Image from 'next/image';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <Head>
        <title>watchlistr</title>
      </Head>
      <div
        className="signin-page text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          margin: '0 auto',
        }}
      >
        <div className="logo">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={276}
            height={240}
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

export default Signin;
