import produce from 'immer';

function createReducer(initialState, handlerMap) {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const handler = handlerMap[action.type];
      if(handler) {
        handler(draft, action);
      }
    });
  }
}

function reducer(state = INITIAL_STATE, action) {
  return produce(state, drfat => {
    switch(action.type) {
      case ADD:
        draft.todos.push(action.todo);
        break;
      case REMOVE_ALL:
        draft.todos = [];
        break;
      case REMOVE:
        draft.todos = draft.todos.filter(todo => todo.id !== action.id);
        break;
      default:
        break;
    }
  });
}

const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => state.todos.push(action.todo),
  [REMOVE_ALL]: state => (state.todos = []),
  [REMOVE]: (state, action) =>
    (state.todos = state.todos.filter(todo => todo.id !== action.id)),
});
