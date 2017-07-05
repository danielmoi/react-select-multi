const ACTIONS = [
  'RSM_ADD_SELECT',
  'RSM_REMOVE_SELECT',

  'RSM_TOGGLE_OPEN',
  'RSM_HANDLE_CLICKOUT',
  'RSM_SAVE_SEARCH',

  'RSM_SET_SELECTED',
  'RSM_CLEAR_SELECTED',

  'RSM_SET_OPTIONS',
  'RSM_CLEAR_OPTIONS',
  'RSM_MERGE_OPTIONS',

  'RSM_ADD_ITEM',
  'RSM_REMOVE_ITEM',
];

const populatedActions = {};

for (const action of ACTIONS) {
  populatedActions[action] = action;
}

export default populatedActions;
