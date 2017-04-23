/* @flow */

import C from './constants';
import type { ActionCreator } from '../types';


const addSelect: ActionCreator = (data: Object) => ({
  type: C.RSM_ADD_SELECT,
  data,
});

const searchOptions: ActionCreator = (data: Object) => ({
  type: C.RSM_SEARCH_OPTIONS,
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

export {
  addSelect,
  toggleOpen,
  searchOptions,
  saveSelected,
  removeSelect,
};
