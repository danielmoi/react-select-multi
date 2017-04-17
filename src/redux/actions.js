import C from './constants';

const addSelect = data => ({
  type: C.RSM_ADD_SELECT,
  data,
});

const searchOptions = data => ({
  type: C.RSM_SEARCH_OPTIONS,
  data,
});

const toggleOpen = data => ({
  type: C.RSM_TOGGLE_OPEN,
  data,
});

const saveSelected = data => ({
  type: C.RSM_SAVE_SELECTED,
  data,
});

const removeSelect = data => ({
  type: C.RSM_REMOVE_SELECT,
  data,
});

module.exports = {
  addSelect,
  toggleOpen,
  searchOptions,
  saveSelected,
  removeSelect,
};
