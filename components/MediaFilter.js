/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { PiTelevisionSimpleBold } from 'react-icons/pi';
import { TbMovie } from 'react-icons/tb';

export default function MediaFilter({ filterMedia }) {
  const [selectedFilter, setSelectedFilter] = useState({ label: 'Filter', icon: null });

  const filters = [
    { label: 'All', icon: <FaHome />, type: 'All' },
    { label: 'Movies', icon: <TbMovie />, type: 'movie' },
    { label: 'TV Shows', icon: <PiTelevisionSimpleBold />, type: 'tv' },
    { label: 'Watched', icon: <ImCheckboxChecked />, type: 'All', watched: true },
    { label: 'Unwatched', icon: <ImCheckboxUnchecked />, type: 'All', watched: false },
  ];

  const handleSelect = (filter) => {
    setSelectedFilter({ label: filter.label, icon: filter.icon });
    filterMedia(filter.type, filter.watched);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="btn-transparent">
        {selectedFilter.icon} {selectedFilter.label}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {filters.map((filter) => (
          <Dropdown.Item
            key={filter.label}
            onClick={() => handleSelect(filter)}
          >
            {filter.icon} {filter.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

MediaFilter.propTypes = {
  filterMedia: PropTypes.func.isRequired,
};
