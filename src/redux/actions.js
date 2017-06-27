/* @flow */

import C from './constants';
import type { ActionCreator } from '../types';


const addSelect: ActionCreator = (data: Object) => ({
  type: C.RSM_ADD_SELECT,
  data,
});

const saveSearch: ActionCreator = (data: Object) => ({
  type: C.RSM_SAVE_SEARCH,
  data,
});

const toggleOpen: ActionCreator = (data: Object) => ({
  type: C.RSM_TOGGLE_OPEN,
  data,
});

const saveSelected: ActionCreator = (data: Object) => ({
  type: C.RSM_SAVE_SELECTED,
  data,
});

const removeSelect: ActionCreator = (data: Object) => ({
  type: C.RSM_REMOVE_SELECT,
  data,
});

const saveOptionsUI: ActionCreator = (data: Object) => ({
  type: C.RSM_SAVE_OPTIONS_UI,
  data,
});

const addSelected: ActionCreator = (data: Object) => ({
  type: C.RSM_ADD_SELECTED,
  data,
});

const addItem: ActionCreator = (data: Object) => ({
  type: C.RSM_ADD_ITEM,
  data,
});

const removeItem: ActionCreator = (data: Object) => ({
  type: C.RSM_REMOVE_ITEM,
  data,
});

const removeOptionUI: ActionCreator = (data: Object) => ({
  type: C.RSM_REMOVE_OPTION_UI,
  data,
});

const mergeOptionsUI: ActionCreator = (data: Object) => ({
  type: C.RSM_MERGE_OPTIONS_UI,
  data,
});

module.exports = {
  addSelect,
  toggleOpen,
  saveSearch,
  saveSelected,
  removeSelect,
  saveOptionsUI,

  addSelected,
  addItem,
  removeItem,

  mergeOptionsUI,
  removeOptionUI,
};
