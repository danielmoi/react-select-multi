import { expect } from 'chai';
import C from '../../src/redux/constants';
import {
  addSelect,
  toggleOpen,
  searchOptions,
  saveSelected,
  removeSelect,
} from '../../src/redux/actions';

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

  it(`should create action for ${C.RSM_SEARCH_OPTIONS}`, () => {
    const expectedAction = {
      type: C.RSM_SEARCH_OPTIONS,
      data: { id: 'select', searchText: 'search' },
    };
    expect(searchOptions(expectedAction.data)).to.deep.equal(expectedAction);
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
});
