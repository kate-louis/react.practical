import {
  createReducer,
  createSetValueAction,
  setValueReducer,
  FETCH_KEY
} from '../../common/redux-helper';

// enum CarmelCase convenstion
export const Types =   {
  Setvalue: 'user/SetValue',
  FetchUser: 'user/FetchUser',
  FetchUpdateUser: 'user/FetchUpdateUser'
}

export const actions = {
  setValue: createSetValueAction(Types.Setvalue),
  fetchUser: name => ({ type: Types.FetchUser, name }),
  fetchUpdateUser: ({ user, key, value, fetchKey }) => ({
    type: Types.FetchUpdateUser,
    user,
    key,
    value,
    [FETCH_KEY]: fetchKey
  }),
}

const INITIAL_STATE = {
  user: undefined,
}
const reducer = createReducer(INITIAL_STATE, {
  [Types.Setvalue]: setValueReducer,
});
export default reducer;
  
  
  