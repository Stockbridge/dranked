import * as types from '../actions/actionTypes';

export default (state = [], action) => {
  console.log(state);
  
  switch (action.type) {
    case types.SUBMIT_ITEM:
      console.log([...state, Object.assign({}, action.submittedItem)]);
      return [...state, Object.assign({}, action.submittedItem)];
    default:
      return state;
  }
};
