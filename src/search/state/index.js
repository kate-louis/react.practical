import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from '../../common/redux-helper';

// enum CarmelCase convenstion
export const Types = {
  Setvalue: 'search/SetValue',
  FetchAutoComplete: 'search/FetchAutoComplete'
}

export const actions = {
  setValue: createSetValueAction(Types.Setvalue),
  fetchAutoComplete: keyword => ({
    type: Types.FetchAutoComplete,
    keyword,
  }),
}

const INITIAL_STATE = {
  keyword: '',
  autoCompletes: [],
}
const reducer = createReducer(INITIAL_STATE, {
  [Types.Setvalue]: setValueReducer,
});
export default reducer;


