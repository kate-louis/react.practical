import produce from 'immer';

export function createReducer(initialState, handlerMap) {
  return function (state = initialState, action) {
    const handler = handlerMap[action.type];
    if (handler) {
      if (action[NOT_IMMUTABLE]) {
        return handler(state, action);
      } else {
        return produce(state, draft => {
          const handler = handlerMap[action.type];
          handler(draft, action);
        });
      }
    } else {
      return state;
    }
  };
}

export function createSetValueAction(type) {
  return (key, value) => ({ type, key, value });
}
export function setValueReducer(state, action) {
  state[action.key] = action.value;
}
