import React from 'react';
import { PropTypes } from 'prop-types';
import SubmittedItem from './SubmittedItem';

const SubmittedItems = ({submittedItems}) => {
  return (
    <div>
      {submittedItems.map((submittedItem) => 
        <SubmittedItem key={submittedItem.name} submittedItem={submittedItem} />  
      )}
    </div>
  );
};

SubmittedItems.propTypes = {
  submittedItems: PropTypes.array.isRequired
};

export default SubmittedItems;