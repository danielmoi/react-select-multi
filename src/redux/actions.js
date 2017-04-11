import C from './constants';

export const searchOptions = data => ({
  type: C.SELECT_SEARCH_VALUES,
  data,
});

export const toggleOpen = data => ({
  type: C.SELECT_TOGGLE_OPEN,
  data,
});

export const selectValue = data => ({
  type: C.SELECT_TAKE_VALUE,
  data,
});

export const clearAll = () => ({
  type: C.SELECT_CLEAR_ALL,
});
