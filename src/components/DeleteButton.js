import React from 'react';
import PropTypes from 'prop-types';

function DeleteButton({ onDelete, id }) {
  return (
    <button onClick={() => onDelete(id)} className="btn btn-primary">Delete</button>
  );
}

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default DeleteButton;
