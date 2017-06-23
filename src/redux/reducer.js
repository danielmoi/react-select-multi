// @flow
import { fromJS } from 'immutable';
import C from './constants';
import initialState from './initial_state';

import type { Action, DataState, Reducer } from '../types';


const reducer: Reducer = (state: DataState = fromJS(initialState), action: Action) => {
  switch (action.type) {
    case C.RSM_ADD_SELECT: {
      const { id } = action.data;
      if (!id) return state;
      return state.merge({
        [id]: { isOpen: false, selected: [], searchTerm: '' },
      });
    }
    case C.RSM_REMOVE_SELECT: {
      const { id } = action.data;
      return state.delete(id);
    }

    case C.RSM_TOGGLE_OPEN: {
      const { id, isOpen } = action.data;
      return state.mergeIn([id, 'isOpen'], isOpen);
    }
    case C.RSM_SAVE_SEARCH: {
      const { id, searchTerm } = action.data;
      return state.setIn([id, 'searchTerm'], searchTerm);
    }

    case C.RSM_SAVE_SELECTED: {
      const { id, selected } = action.data;
      // use setIn because we providing the entire new dataset
      return state.setIn([id, 'selected'], selected);
    }
    case C.RSM_SAVE_OPTIONS_UI: {
      const { id, optionsUI } = action.data;
      return state.setIn([id, 'optionsUI'], optionsUI);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
