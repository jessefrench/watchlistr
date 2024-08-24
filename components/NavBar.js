import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image, Dropdown,
} from 'react-bootstrap';
import { FaHome, FaSearchPlus } from 'react-icons/fa';
import { TbMovie } from 'react-icons/tb';
import { PiTelevisionSimpleBold } from 'react-icons/pi';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

export default function NavBar({ filterMedia }) {
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
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => filterMedia('All')}><FaHome /> All</Dropdown.Item>
              <Dropdown.Item onClick={() => filterMedia('movie')}><TbMovie /> Movies</Dropdown.Item>
              <Dropdown.Item onClick={() => filterMedia('tv')}><PiTelevisionSimpleBold /> TV Shows</Dropdown.Item>
              <Dropdown.Item onClick={() => filterMedia('All', true)}><ImCheckboxChecked /> Watched</Dropdown.Item>
              <Dropdown.Item onClick={() => filterMedia('All', false)}><ImCheckboxUnchecked /> Unwatched</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav className="ms-auto">
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

NavBar.propTypes = {
  filterMedia: PropTypes.func.isRequired,
};
