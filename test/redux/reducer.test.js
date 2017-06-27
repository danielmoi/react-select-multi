import { expect } from 'chai';
import { fromJS } from 'immutable';
import C from '../../src/redux/constants';
import initialStateFixture from '../../src/redux/initial_state';
import reducer from '../../src/redux/reducer';
import { options } from '../fixtures/options';

describe('Reducer', () => {
  let initialState;
  let colorsInitialState;
  beforeEach(() => {
    initialState = fromJS(initialStateFixture);
    colorsInitialState = fromJS({
      colors: {
        isOpen: false,
        selected: [],
        searchTerm: '',
      },
    });
  });

  it('should return the initial state', () => {
    const action = {
      type: 'HELLO THERE',
    };
    expect(reducer(initialState, action))
      .to.deep.equal(initialState);
  });

  // Add a React Select Multi
  it(`should handle ${C.RSM_ADD_SELECT}`, () => {
    const action = {
      type: C.RSM_ADD_SELECT,
      data: { id: 'select' },
    };
    const reducedState = reducer(initialState, action);
    expect(reducedState.get(action.data.id))
      .to.equal(fromJS({ isOpen: false, selected: [], searchTerm: '', options: [] }));
  });

  // Remove a React Select Multi
  it(`should handle ${C.RSM_REMOVE_SELECT}`, () => {
    const action = {
      type: C.RSM_REMOVE_SELECT,
      data: { id: 'colors' },
    };
    const reducedState = reducer(colorsInitialState, action);
    expect(reducedState).to.equal(fromJS(initialState));
  });

  // Toggle State
  it(`should handle ${C.RSM_TOGGLE_OPEN}`, () => {
    const action = {
      type: C.RSM_TOGGLE_OPEN,
      data: { id: 'colors', isOpen: true },
    };
    const reducedState = reducer(colorsInitialState, action);
    expect(reducedState.getIn(['colors', 'isOpen'])).to.equal(true);
  });

  // Search
  it(`should handle ${C.RSM_SAVE_SEARCH}`, () => {
    const action = {
      type: C.RSM_SAVE_SEARCH,
      data: { id: 'colors', searchTerm: 'Cookie Monster' },
    };
    const reducedState = reducer(colorsInitialState, action);
    expect(reducedState.getIn(['colors', 'searchTerm']))
      .to.equal('Cookie Monster');
  });

  // Multiple Selected (Set)
  it(`should handle ${C.RSM_SET_SELECTED}`, () => {
    const action = {
      type: C.RSM_SET_SELECTED,
      data: { id: 'colors', selected: fromJS(['Hotpink', 'Cyan']) },
    };
    const reducedState = reducer(colorsInitialState, action);
    expect(reducedState.getIn(['colors', 'selected']))
      .to.equal(fromJS(['Hotpink', 'Cyan']));
  });

  // Multiple Options (Set)
  it(`should handle ${C.RSM_SET_OPTIONS}`, () => {
    const action = {
      type: C.RSM_SET_OPTIONS,
      data: { id: 'colors', options: fromJS(options) },
    };
    const reducedState = reducer(colorsInitialState, action);
    expect(reducedState.getIn(['colors', 'options']))
      .to.equal(fromJS(options));
  });

  // Multiple Options (Merge)
  it(`should handle ${C.RSM_MERGE_OPTIONS}`, () => {
    const initialOptions = fromJS([
      { id: 1, name: 'Hotpink' },
      { id: 4, name: 'Tomato' },
    ]);
    const newOptions = fromJS([
      { id: 4, name: 'Tomato' },
      { id: 3, name: 'Bleak' },
    ]);
    const action = {
      type: C.RSM_MERGE_OPTIONS,
      data: { id: 'colors', options: newOptions },
    };

    const mergeInitialState = fromJS({
      colors: {
        options: initialOptions,
      },
    });
    const reducedState = reducer(mergeInitialState, action);
    expect(reducedState.getIn(['colors', 'options']).size).to.equal(3);

    const expectedOptions = fromJS([
      { id: 1, name: 'Hotpink' },
      { id: 4, name: 'Tomato' },
      { id: 3, name: 'Bleak' },
    ]);
    expect(reducedState.getIn(['colors', 'options', 0, 'id'])).to.equal(1);
    expect(reducedState.getIn(['colors', 'options'])).to.deep.equal(expectedOptions);
  });

// Single Item (Option / Selected) Add 1/2
  it(`should handle ${C.RSM_ADD_ITEM} - unique new`, () => {
    const toAdd = fromJS({
      id: 1, name: 'Tommo',
    });

    const addInitialState = fromJS({
      names: {
        options: [{ id: 2, name: 'Zelda' }],
      },
    });

    const action = {
      type: C.RSM_ADD_ITEM,
      data: {
        id: 'names',
        option: toAdd,
        addTo: 'options',
      },
    };

    const reducedState = reducer(addInitialState, action);
    expect(reducedState.getIn(['names', 'options']).size).to.equal(2);

    const expectedOptions = fromJS([
      { id: 2, name: 'Zelda' },
      { id: 1, name: 'Tommo' },
    ]);
    expect(reducedState.getIn(['names', 'options'])).to.deep.equal(expectedOptions);
  });

  // Single Item (Option / Selected) Add 2/2
  it(`should handle ${C.RSM_ADD_ITEM} - duplicate new`, () => {
    const toAdd = fromJS({
      id: 2, name: 'Zelda',
    });

    const addInitialState = fromJS({
      names: {
        options: [{ id: 2, name: 'Zelda' }],
      },
    });

    const action = {
      type: C.RSM_ADD_ITEM,
      data: {
        id: 'names',
        option: toAdd,
        addTo: 'options',
      },
    };

    const reducedState = reducer(addInitialState, action);
    expect(reducedState.getIn(['names', 'options']).size).to.equal(1);

    const expectedOptions = fromJS([
      { id: 2, name: 'Zelda' },
    ]);
    expect(reducedState.getIn(['names', 'options'])).to.deep.equal(expectedOptions);
  });

  // Single Item (Option / Selected) Remove
  it(`should handle ${C.RSM_REMOVE_ITEM}`, () => {
    const toRemove = fromJS({
      id: 3, name: 'Snorlax',
    });

    const addInitialState = fromJS({
      names: {
        selected: [
          { id: 3, name: 'Snorlax' },
          { id: 2, name: 'Zelda' },
        ],
      },
    });

    const action = {
      type: C.RSM_REMOVE_ITEM,
      data: {
        id: 'names',
        option: toRemove,
        removeFrom: 'selected',
      },
    };

    const reducedState = reducer(addInitialState, action);
    expect(reducedState.getIn(['names', 'selected']).size).to.equal(1);

    const expectedSelected = fromJS([
      { id: 2, name: 'Zelda' },
    ]);
    expect(reducedState.getIn(['names', 'selected'])).to.deep.equal(expectedSelected);
  });
});
