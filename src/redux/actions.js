import C from './constants';

const addSet = data => ({
  type: C.SELECT_ADD_SET,
  data,
});

const searchOptions = data => ({
  type: C.SELECT_SEARCH_VALUES,
  data,
});

const toggleOpen = data => ({
  type: C.SELECT_TOGGLE_OPEN,
  data,
});

const selectValue = data => ({
  type: C.SELECT_TAKE_VALUE,
  data,
});

const clearAll = () => ({
  type: C.SELECT_CLEAR_ALL,
});

module.exports = {
  addSet,
  toggleOpen,
  searchOptions,
  selectValue,
  clearAll,
};
