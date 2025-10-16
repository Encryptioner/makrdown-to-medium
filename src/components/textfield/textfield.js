import React from 'react';
import './textfield.css';
import { useDispatch } from 'react-redux';
import { setContent } from '../../state.js';

const TextField = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setContent(e.target.value));
  };

  return (
    <textarea
      className="textfield"
      onChange={handleChange}
      placeholder="Enter your markdown here..."
    />
  );
};

export default TextField;
