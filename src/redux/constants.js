const ACTIONS = [
  'RSM_ADD_SELECT',
  'RSM_TOGGLE_OPEN',
  'RSM_HANDLE_CLICKOUT',
  'RSM_SEARCH_OPTIONS',
  'RSM_SAVE_SELECTED',
  'RSM_REMOVE_SELECT',
];

const populatedActions = {};

for (const action of ACTIONS) {
  populatedActions[action] = action;
}

export default populatedActions;
