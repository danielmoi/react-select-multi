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

// Multiple Selected
const setSelected: ActionCreator = (data: Object) => ({
  type: C.RSM_SET_SELECTED,
  data,
});

// Multiple Options
const mergeOptions: ActionCreator = (data: Object) => ({
  type: C.RSM_MERGE_OPTIONS,
  data,
});
const setOptions: ActionCreator = (data: Object) => ({
  type: C.RSM_SET_OPTIONS,
  data,
});

// Single Item (Option / Selected)
const addItem: ActionCreator = (data: Object) => ({
  type: C.RSM_ADD_ITEM,
  data,
});

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
  setOptions,
  mergeOptions,

  addItem,
  removeItem,
};
