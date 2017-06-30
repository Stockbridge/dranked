import * as types from './actionTypes';

export const submitItem = (submittedItem) => {
  return {
    type: types.SUBMIT_ITEM,
    submittedItem
  };
}