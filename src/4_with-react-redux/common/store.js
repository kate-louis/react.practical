import { createStore, combineReducers } from 'redux';
import timelineReducer from '../timeline/state';
import friendReducer from '../friend/state';

const reducer = combineReducers({
  timeline: timelineReducer,
  friend: friendReducer,
});
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
export default store;
