// Actions
const SET_TOOLS = 'SET_TOOLS';
const ADD_TOOL = 'ADD_TOOL';
const EDIT_TOOL = 'EDIT_TOOL';

// Initial state
const INITIAL_STATE = {
  tools: []
};

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOOLS:
      const tools = action.tools;

      return {
        ...state,
        tools
      };

    case ADD_TOOL:
      const newTools = [...state.tools];
      newTools.unshift(action.tool);

      return {
        ...state,
        tools: newTools
      };

    case EDIT_TOOL:
      const editedTools = state.tools.filter(tool => tool._id !== action.tool._id);
      editedTools.unshift(action.tool);

      return {
        ...state,
        tools: editedTools
      };

    default:
      return state;
  }
}

// Action Creators
export function setTools(tools) {
  return { type: SET_TOOLS, tools };
}

export function addTool(tool) {
  return { type: ADD_TOOL, tool };
}

export function editTool(tool) {
  return { type: EDIT_TOOL, tool };
}
