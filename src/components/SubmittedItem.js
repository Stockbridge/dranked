import React from 'react';
import { PropTypes } from 'prop-types'

const SubmittedItem = ({submittedItem}) => {
  return (
    <div>
      {submittedItem.type}, {submittedItem.name}
    </div>
  );
};

SubmittedItem.propTypes = {
  submittedItem: PropTypes.object.isRequired
};

export default SubmittedItem;