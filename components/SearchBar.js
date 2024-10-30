import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { CiSearch } from 'react-icons/ci';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState({ search: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') {
      router.push(`/search/${searchInput.search}`);
    } else {
      router.push('/');
    }
    setSearchInput('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Search watchlist"
          aria-label="Search"
          name="search"
          value={searchInput.search}
          onChange={handleChange}
        />
        <Button variant="secondary" type="submit"><CiSearch /></Button>
      </InputGroup>
    </Form>
  );
}
