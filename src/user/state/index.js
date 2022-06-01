import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from '../../common/redux-helper';

// enum CarmelCase convenstion
export const Types =   {
  Setvalue: 'user/SetValue',
  FetchUser: 'user/FetchUser',
}

export const actions = {
  setValue: createSetValueAction(Types.Setvalue),
  fetchUser: name => ({ type: Types.FetchUser, name }),
}

const INITIAL_STATE = {
  user: undefined
}
const reducer = createReducer(INITIAL_STATE, {
  [Types.Setvalue]: setValueReducer,
});
export default reducer;
  
  
  