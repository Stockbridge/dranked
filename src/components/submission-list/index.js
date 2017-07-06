import React from 'react';
import { PropTypes } from 'prop-types';

const SubmissionList = ({submittedItems}) => {
  return (
    <ul className="submission-list">
      {submittedItems.map((submittedItem) =>
        <li className="submission-list__item" key={submittedItem.name}>{submittedItem.type}, {submittedItem.name}</li>
      )}
    </ul>
  );
};

SubmissionList.propTypes = {
  submittedItems: PropTypes.array.isRequired
};

export default SubmissionList;