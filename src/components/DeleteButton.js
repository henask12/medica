import React from 'react';
import PropTypes from 'prop-types';


function DeleteButton({ onDelete, id }) {
  return (
    <button onClick={() => onDelete(id)} className="delete-button">Delete</button>
  );
}

const handleDelete = (id) => {
  console.log('Doctor with ID', id, 'will be deleted.');
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default DeleteButton;
