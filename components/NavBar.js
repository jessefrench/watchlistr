/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>WATCHLISTR</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/media/new" passHref>
              <Button variant="secondary">New <FiEdit /></Button>
            </Link>
          </Nav>
          <SearchBar />
          <UserMenu />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
