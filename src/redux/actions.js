/* @flow */

import C from './constants';
import type { FSA } from '../types';


const addSelect: FSA = (data: Object) => ({
  type: C.RSM_ADD_SELECT,
  data,
});

const searchOptions: FSA = (data: Object) => ({
  type: C.RSM_SEARCH_OPTIONS,
  data,
});

const toggleOpen: FSA = (data: Object) => ({
  type: C.RSM_TOGGLE_OPEN,
  data,
});

const saveSelected: FSA = (data: Object) => ({
  type: C.RSM_SAVE_SELECTED,
  data,
});

const removeSelect: FSA = () => ({
  type: C.RSM_REMOVE_SELECT,
  data: {},
});

<<<<<<< HEAD
module.exports = {
  addSelect,
=======
exports = {
  addSet,
>>>>>>> make it work in code
  toggleOpen,
  searchOptions,
  saveSelected,
  removeSelect,
};
