import { expect } from 'chai';
import { fromJS } from 'immutable';
import C from '../../src/redux/constants';
import initialStateFixture from '../../src/redux/initial_state';
import reducer from '../../src/redux/reducer';

describe('Reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = fromJS(initialStateFixture);
  });

  it('should return the initial state', () => {
    expect(reducer(initialState, 'FAKEY FAKE'))
      .to.deep.equal(initialState);
  });

  it(`should handle ${C.SELECT_TOGGLE_OPEN}`, () => {
    const action = {
      type: C.SELECT_TOGGLE_OPEN,
      data: { name: 'select', open: true },
    };
    const reducedState = reducer(initialState, action);
    expect(reducedState.get(action.data.name)).to.eql(fromJS({ isOpen: true }));
  });

  it(`should handle ${C.SELECT_SEARCH_VALUES}`, () => {
    const action = {
      type: C.SELECT_SEARCH_VALUES,
      data: { name: 'select', searchText: 'test' },
    };
    const reducedState = reducer(initialState, action);
    expect(reducedState.get(action.data.name)).to.eql(fromJS({ searchTerm: 'test' }));
  });

  it(`should handle ${C.SELECT_TAKE_VALUE}`, () => {
    const action = {
      type: C.SELECT_TAKE_VALUE,
      data: { name: 'select', values: ['Orders', 'Customers'] },
    };
    const reducedState = reducer(initialState, action);
    expect(reducedState.get(action.data.name)).to.eql(fromJS({ values: action.data.values }));
  });

  it(`should handle ${C.SELECT_CLEAR_ALL}`, () => {
    const action = {
      type: C.CLEAR_FORM,
    };
    const reducedState = reducer(initialState, action);
    expect(reducedState).to.equal(fromJS(initialState));
  });
});
