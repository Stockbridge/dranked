import submittedItems from './submitItemReducer.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  submittedItems
});

export default rootReducer;
