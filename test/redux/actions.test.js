import { expect } from 'chai';
import { fromJS } from 'immutable';
import C from '../../src/redux/constants';
import {
  addSelect,
  removeSelect,

  toggleOpen,
  saveSearch,

  setSelected,
  setOptions,
  mergeOptions,

  addItem,
  removeItem,
} from '../../src/redux/actions';
import { options } from '../fixtures/options';

describe('Actions', () => {
  // Add a React Select Multi
  it(`should create action for ${C.RSM_ADD_SELECT}`, () => {
    const expectedAction = {
      type: C.RSM_ADD_SELECT,
      data: { id: 'select' },
    };
    expect(addSelect(expectedAction.data)).to.deep.equal(expectedAction);
  });

  // Remove a React Select Multi
  it(`should create action for ${C.RSM_REMOVE_SELECT}`, () => {
    const expectedAction = {
      type: C.RSM_REMOVE_SELECT,
      data: { id: 'select' },
    };
    expect(removeSelect(expectedAction.data)).to.deep.equal(expectedAction);
  });

  // Toggle State
  it(`should create action for ${C.RSM_TOGGLE_OPEN}`, () => {
    const expectedAction = {
      type: C.RSM_TOGGLE_OPEN,
      data: { id: 'select', open: true },
    };
    expect(toggleOpen(expectedAction.data)).to.deep.equal(expectedAction);
  });

  // Search
  it(`should create action for ${C.RSM_SAVE_SEARCH}`, () => {
    const expectedAction = {
      type: C.RSM_SAVE_SEARCH,
      data: { id: 'select', search: 'Cookie Monster' },
    };
    expect(saveSearch(expectedAction.data)).to.deep.equal(expectedAction);
  });

  // Multiple Selected (Set)
  it(`should create action for ${C.RSM_SET_SELECTED}`, () => {
    const expectedAction = {
      type: C.RSM_SET_SELECTED,
      data: { id: 'select', selected: ['Option 1', 'Option 2'] },
    };
    expect(setSelected(expectedAction.data)).to.deep.equal(expectedAction);
  });

  // Multiple Options (Set)
  it(`should create action for ${C.RSM_SET_OPTIONS}`, () => {
    const expectedAction = {
      type: C.RSM_SET_OPTIONS,
      data: { id: 'select', options: fromJS(options) },
    };
    expect(setOptions(expectedAction.data)).to.deep.equal(expectedAction);
  });

  // Multiple Options (Merge)
  it(`should create action for ${C.RSM_MERGE_OPTIONS}`, () => {
    const expectedAction = {
      type: C.RSM_MERGE_OPTIONS,
      data: { id: 'select', options: fromJS(options) },
    };
    expect(mergeOptions(expectedAction.data)).to.deep.equal(expectedAction);
  });

  // Single Item (Option / Selected) – Add
  it(`should create action for ${C.RSM_ADD_ITEM}`, () => {
    const expectedAction = {
      type: C.RSM_ADD_ITEM,
      data: { id: 'select', option: fromJS(options[0]), addTo: 'colors' },
    };
    expect(addItem(expectedAction.data)).to.deep.equal(expectedAction);
  });

  // Single Item (Option / Selected) – Remove
  it(`should create action for ${C.RSM_REMOVE_ITEM}`, () => {
    const expectedAction = {
      type: C.RSM_REMOVE_ITEM,
      data: { id: 'select', option: fromJS(options[0]), removeFrom: 'colors' },
    };
    expect(removeItem(expectedAction.data)).to.deep.equal(expectedAction);
  });
});
