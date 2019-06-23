// Actions
const SET_TOOLS = 'SET_TOOLS';

// Initial state
const INITIAL_STATE = {
  tools: []
};

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOOLS:
      const tools = action.tools;
      console.log('[SET_TOOLS]', tools);

      return {
        ...state,
        tools
      };
    default:
      return state;
  }
}

// Action Creators
export function setTools(tools) {
  return { type: SET_TOOLS, tools };
}
