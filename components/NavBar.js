import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import SideBar from './SideBar';

export default function NavBar({ filterMedia }) {
  const isMobile = useMediaQuery({ maxWidth: 991 });

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="nav">
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
          <Nav className="ms-auto">
            <Link href="/lookup" passHref>
              <Button className="nav-btn" variant="secondary">Lookup <FaSearchPlus /></Button>
            </Link>
          </Nav>
          <SearchBar />
          <UserMenu />
          {isMobile && <SideBar filterMedia={filterMedia} />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  filterMedia: PropTypes.func.isRequired,
};
