import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMedia, updateMedia } from '../../api/mediaData';

const initialState = {
  watched: false,
};

export default function MediaForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Media</Button>
    </Form>
  );
}

MediaForm.propTypes = {
  obj: PropTypes.shape({
    watched: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

MediaForm.defaultProps = {
  obj: initialState,
};
