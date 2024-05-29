/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>WATCHLISTR</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/media/new" passHref>
              <Button>New</Button>
            </Link>
          </Nav>
          <SearchBar />
          <UserMenu />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
