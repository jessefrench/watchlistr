import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMedia, updateMedia } from '../../api/mediaData';
import { getGenres } from '../../api/genreData';
import { getTypes } from '../../api/typeData';
import { getNetworks } from '../../api/networkData';

const initialState = {
  name: '',
  overview: '',
  image_url: '',
  type_id: '',
  genre_id: '',
  network_id: '',
  watched: false,
};

export default function MediaForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [networks, setNetworks] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGenres().then(setGenres);
    getTypes().then(setTypes);
    getNetworks().then(setNetworks);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMedia(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMedia(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMedia(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Media</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* OVERVIEW TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Overview" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Overview"
          style={{ height: '100px' }}
          name="overview"
          value={formInput.overview}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image_url"
          value={formInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TYPE SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Type">
        <Form.Select
          aria-label="Type"
          name="type_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.type_id}
          required
        >
          <option value="">Select a type</option>
          {
            types.map((type) => (
              <option
                key={type.firebaseKey}
                value={type.firebaseKey}
              >
                {type.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* GENRE SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Genre">
        <Form.Select
          aria-label="Genre"
          name="genre_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.genre_id}
          required
        >
          <option value="">Select a genre</option>
          {
            genres.map((genre) => (
              <option
                key={genre.firebaseKey}
                value={genre.firebaseKey}
              >
                {genre.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* NETWORK SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Network">
        <Form.Select
          aria-label="Network"
          name="network_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.network_id}
          required
        >
          <option value="">Select a network</option>
          {
            networks.map((network) => (
              <option
                key={network.firebaseKey}
                value={network.firebaseKey}
              >
                {network.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* WATCHED/UNWATCHED TOGGLE */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="watched"
        name="watched"
        label="Watched?"
        checked={formInput.watched}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            watched: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Media</Button>
    </Form>
  );
}

MediaForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    overview: PropTypes.string,
    image_url: PropTypes.string,
    type_id: PropTypes.string,
    genre_id: PropTypes.string,
    network_id: PropTypes.string,
    watched: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

MediaForm.defaultProps = {
  obj: initialState,
};
