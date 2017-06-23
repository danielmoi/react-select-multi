import { expect } from 'chai';
import { fromJS } from 'immutable';
import C from '../../src/redux/constants';
import {
  addSelect,
  removeSelect,
  toggleOpen,
  saveSearch,
  saveSelected,
  saveOptionsUI,
} from '../../src/redux/actions';
import { optionsUI } from '../fixtures/options';

describe('Actions', () => {
  it(`should create action for ${C.RSM_ADD_SELECT}`, () => {
    const expectedAction = {
      type: C.RSM_ADD_SELECT,
      data: { id: 'select' },
    };
    expect(addSelect(expectedAction.data)).to.deep.equal(expectedAction);
  });

  it(`should create action for ${C.RSM_TOGGLE_OPEN}`, () => {
    const expectedAction = {
      type: C.RSM_TOGGLE_OPEN,
      data: { id: 'select', open: true },
    };
    expect(toggleOpen(expectedAction.data)).to.deep.equal(expectedAction);
  });

  it(`should create action for ${C.RSM_SAVE_SELECTED}`, () => {
    const expectedAction = {
      type: C.RSM_SAVE_SELECTED,
      data: { id: 'select', selected: ['Option 1', 'Option 2'] },
    };
    expect(saveSelected(expectedAction.data)).to.deep.equal(expectedAction);
  });

  it(`should create action for ${C.RSM_REMOVE_SELECT}`, () => {
    const expectedAction = {
      type: C.RSM_REMOVE_SELECT,
      data: { id: 'select' },
    };
    expect(removeSelect(expectedAction.data)).to.deep.equal(expectedAction);
  });

  it(`should create action for ${C.RSM_SAVE_SEARCH}`, () => {
    const expectedAction = {
      type: C.RSM_SAVE_SEARCH,
      data: { id: 'select', search: 'Cookie Monster' },
    };
    expect(saveSearch(expectedAction.data)).to.deep.equal(expectedAction);
  });

  it(`should create action for ${C.RSM_SAVE_OPTIONS_UI}`, () => {
    const expectedAction = {
      type: C.RSM_SAVE_OPTIONS_UI,
      data: { id: 'select', optionsUI: fromJS(optionsUI) },
    };
    expect(saveOptionsUI(expectedAction.data)).to.deep.equal(expectedAction);
  });
});
