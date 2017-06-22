const ACTIONS = [
  'RSM_ADD_SELECT',
  'RSM_REMOVE_SELECT',
  'RSM_TOGGLE_OPEN',
  'RSM_HANDLE_CLICKOUT',
  'RSM_SAVE_SEARCH',
  'RSM_SAVE_SELECTED',
  'RSM_SAVE_OPTIONS_UI',
];

const populatedActions = {};

for (const action of ACTIONS) {
  populatedActions[action] = action;
}

export default populatedActions;
