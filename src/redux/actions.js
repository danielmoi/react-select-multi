import C from './constants';

const addSet = data => ({
  type: C.SELECT_ADD_SET,
  data,
});

const searchOptions = data => ({
  type: C.SELECT_SEARCH_OPTIONS,
  data,
});

const toggleOpen = data => ({
  type: C.SELECT_TOGGLE_OPEN,
  data,
});

const takeValue = data => ({
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
  takeValue,
  clearAll,
};
