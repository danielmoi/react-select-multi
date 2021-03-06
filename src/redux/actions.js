/* @flow */

import C from './constants';
import type { ActionCreator } from '../types';

// Add a React Select Multi
const addSelect: ActionCreator = (data: Object) => ({
  type: C.RSM_ADD_SELECT,
  data,
});

// Remove a React Select Multi
const removeSelect: ActionCreator = (data: Object) => ({
  type: C.RSM_REMOVE_SELECT,
  data,
});

// Toggle State
const toggleOpen: ActionCreator = (data: Object) => ({
  type: C.RSM_TOGGLE_OPEN,
  data,
});

// Search
const saveSearch: ActionCreator = (data: Object) => ({
  type: C.RSM_SAVE_SEARCH,
  data,
});

// Multiple Selected (Set)
const setSelected: ActionCreator = (data: Object) => ({
  type: C.RSM_SET_SELECTED,
  data,
});

// Multiple Selected (Clear)
const clearSelected: ActionCreator = (data: Object) => ({
  type: C.RSM_CLEAR_SELECTED,
  data,
});

// Multiple Options (Merge)
const mergeOptions: ActionCreator = (data: Object) => ({
  type: C.RSM_MERGE_OPTIONS,
  data,
});

// Multiple Options (Set)
const setOptions: ActionCreator = (data: Object) => ({
  type: C.RSM_SET_OPTIONS,
  data,
});

// Multiple Options (Clear)
const clearOptions: ActionCreator = (data: Object) => ({
  type: C.RSM_CLEAR_OPTIONS,
  data,
});

// Single Item (Option / Selected) – Add
const addItem: ActionCreator = (data: Object) => ({
  type: C.RSM_ADD_ITEM,
  data,
});

// Single Item (Option / Selected) – Remove
const removeItem: ActionCreator = (data: Object) => ({
  type: C.RSM_REMOVE_ITEM,
  data,
});

module.exports = {
  addSelect,
  removeSelect,

  toggleOpen,
  saveSearch,

  setSelected,
  clearSelected,

  setOptions,
  clearOptions,
  mergeOptions,

  addItem,
  removeItem,
};
