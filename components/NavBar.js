import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar variant="dark" expand="md" className="navbar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="nav-brand d-flex align-items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="nav-img"
            />
            <span className="nav-title">watchlistr</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="ms-auto d-flex justify-content-center align-items-center flex-row nav-elements">
            <Link href="/lookup" passHref>
              <Button variant="secondary" className="nav-button me-2">
                <FaSearchPlus /> New
              </Button>
            </Link>
            <SearchBar className="me-2" />
            <UserMenu />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
