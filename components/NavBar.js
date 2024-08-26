import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image, Offcanvas,
} from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
import MediaFilter from './MediaFilter';

export default function NavBar({ filterMedia }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar variant="dark" expand="lg" className="navbar">
        <Container>
          <Link passHref href="/">
            <Navbar.Brand className="nav-brand d-flex align-items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="nav-img"
              />
              watchlistr
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} className="ms-auto" />
          <Navbar.Collapse className="d-none d-lg-flex justify-content-end">
            <Nav className="align-items-center">
              <Nav.Item className="me-2">
                <MediaFilter filterMedia={filterMedia} />
              </Nav.Item>
              <Nav.Item className="me-2">
                <Link href="/lookup" passHref>
                  <Button className="nav-btn" variant="secondary">Lookup <FaSearchPlus /></Button>
                </Link>
              </Nav.Item>
              <Nav.Item className="me-2">
                <SearchBar />
              </Nav.Item>
              <Nav.Item>
                <UserMenu />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Item>
              <MediaFilter filterMedia={filterMedia} />
            </Nav.Item>
            <Nav.Item>
              <Link href="/lookup" passHref>
                <Button className="nav-btn" variant="secondary">Lookup <FaSearchPlus /></Button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <SearchBar />
            </Nav.Item>
            <Nav.Item>
              <UserMenu />
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

NavBar.propTypes = {
  filterMedia: PropTypes.func.isRequired,
};
