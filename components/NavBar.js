import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
import MediaFilter from './MediaFilter';

export default function NavBar({ filterMedia }) {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="nav-brand">
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="nav-img"
            />
            watchlistr
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto me-auto">
            <Nav.Item>
              <MediaFilter filterMedia={filterMedia} />
            </Nav.Item>
          </Nav>
          <Link href="/lookup" passHref>
            <Button className="nav-btn" variant="secondary">Lookup <FaSearchPlus /></Button>
          </Link>
          <SearchBar />
          <UserMenu />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  filterMedia: PropTypes.func.isRequired,
};
