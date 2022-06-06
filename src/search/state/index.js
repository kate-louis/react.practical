import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from '../../common/redux-helper';

// enum CarmelCase convenstion
export const Types =   {
  Setvalue: 'search/SetValue',
  FetchAutoComplete: 'search/FetchAutoComplete',
  FetchAllHistory: 'user/FetchAllHistory',
}

export const actions = {
  setValue: createSetValueAction(Types.Setvalue),
  fetchAutoComplete: keyword => ({
    type: Types.FetchAutoComplete,
    keyword,
  }),
  fetchAllHistory: () => ({ type: Types.FetchAllHistory }),
}

const INITIAL_STATE = {
  keyword: '',
  autoCompletes: [],
  history: [],
}
const reducer = createReducer(INITIAL_STATE, {
  [Types.Setvalue]: setValueReducer,
});
export default reducer;


