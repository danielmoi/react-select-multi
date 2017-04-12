import { expect } from 'chai';
import C from '../../src/redux/constants';
import { addSet, toggleOpen, searchOptions, takeValue, clearAll } from '../../src/redux/actions';

describe('Actions', () => {
  it(`should create action for ${C.SELECT_ADD_SET}`, () => {
    const expectedAction = {
      type: C.SELECT_ADD_SET,
      data: { name: 'select' },
    };
    expect(addSet(expectedAction.data)).to.deep.equal(expectedAction);
  });

  it(`should create action for ${C.SELECT_TOGGLE_OPEN}`, () => {
    const expectedAction = {
      type: C.SELECT_TOGGLE_OPEN,
      data: { name: 'select', open: true },
    };
    expect(toggleOpen(expectedAction.data)).to.deep.equal(expectedAction);
  });

  it(`should create action for ${C.SELECT_SEARCH_OPTIONS}`, () => {
    const expectedAction = {
      type: C.SELECT_SEARCH_OPTIONS,
      data: { name: 'select', searchText: 'search' },
    };
    expect(searchOptions(expectedAction.data)).to.deep.equal(expectedAction);
  });

  it(`should create action for ${C.SELECT_TAKE_VALUE}`, () => {
    const expectedAction = {
      type: C.SELECT_TAKE_VALUE,
      data: { name: 'select', values: ['Value', 'Another Value'] },
    };
    expect(takeValue(expectedAction.data)).to.deep.equal(expectedAction);
  });

  it(`should create action for ${C.SELECT_CLEAR_ALL}`, () => {
    const expectedAction = {
      type: C.SELECT_CLEAR_ALL,
    };
    expect(clearAll()).to.deep.equal(expectedAction);
  });
});
