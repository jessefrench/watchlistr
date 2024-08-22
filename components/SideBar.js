import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { TbMovie } from 'react-icons/tb';
import { PiTelevisionSimpleBold } from 'react-icons/pi';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

export default function SideBar({ filterMedia }) {
  return (
    <div className="sidebar">
      <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('All')}>
        <FaHome className="filter-btn-icons" /> All
      </Button>
      <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('movie')}>
        <TbMovie className="filter-btn-icons" /> Movies
      </Button>
      <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('tv')}>
        <PiTelevisionSimpleBold className="filter-btn-icons" /> TV Shows
      </Button>
      <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('All', true)}>
        <ImCheckboxChecked className="filter-btn-icons" /> Watched
      </Button>
      <Button variant="secondary" className="filter-btn" onClick={() => filterMedia('All', false)}>
        <ImCheckboxUnchecked className="filter-btn-icons" /> Unwatched
      </Button>
    </div>
  );
}

SideBar.propTypes = {
  filterMedia: PropTypes.func.isRequired,
};
