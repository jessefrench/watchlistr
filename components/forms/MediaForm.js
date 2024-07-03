import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import ReactStars from 'react-stars';
import { useAuth } from '../../utils/context/authContext';
import { createMedia, updateMedia } from '../../api/mediaData';

const initialState = {
  name: '',
  comments: '',
  watched: false,
  rating: 0,
};

export default function MediaForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    if (typeof e === 'number') {
      setFormInput((prevState) => ({
        ...prevState,
        rating: e,
      }));
    } else {
      const { name, value } = e.target;
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
    <div>
      <h2 className="text-white mt-5">Update {obj.name}</h2>
      <Form className="media-form" onSubmit={handleSubmit}>

        {/* RATING INPUT */}
        <div className="mb-3">
          <span>Rating</span>
          <ReactStars
            count={5}
            size={24}
            value={formInput.rating}
            onChange={handleChange}
            color2="#ffd700"
          />
        </div>

        {/* WATCHED/UNWATCHED TOGGLE */}
        <Form.Check
          className="watched-checkbox text-white mb-3"
          type="checkbox"
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

        {/* COMMENTS TEXTAREA  */}
        <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
          <Form.Control
            as="textarea"
            style={{ height: '100px' }}
            name="comments"
            value={formInput.comments}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

MediaForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    comments: PropTypes.string,
    watched: PropTypes.bool,
    firebaseKey: PropTypes.string,
    rating: PropTypes.number,
  }),
};

MediaForm.defaultProps = {
  obj: initialState,
};
