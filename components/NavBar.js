/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
  Image,
} from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { FaSearchPlus } from 'react-icons/fa';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="nav">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="nav-brand">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={60}
              height={50}
              style={{ marginRight: '10px' }}
            />
            watchlistr
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/media/new" passHref>
              <Button className="nav-btn" variant="secondary">New <FiEdit /></Button>
            </Link>
            <Link href="/lookup" passHref>
              <Button className="nav-btn" variant="secondary">Lookup <FaSearchPlus /></Button>
            </Link>
          </Nav>
          <SearchBar />
          <UserMenu />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
