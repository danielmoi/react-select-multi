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
        [id]: { isOpen: false, selected: [], searchTerm: '', optionsUI: [] },
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
    case C.RSM_REMOVE_OPTION_UI: {
      const { id, option } = action.data;
      const existing = state.getIn([id, 'optionsUI']);
      const updated = existing.toOrderedSet().remove(option).toList();
      const merged = state.setIn([id, 'optionsUI'], updated);
      return merged;
    }

    case C.RSM_ADD_ITEM: {
      const { id, option, addTo } = action.data;
      const existing = state.getIn([id, addTo]);
      const updated = existing.toOrderedSet().add(option).toList();
      const merged = state.setIn([id, addTo], updated);
      return merged;
    }
    case C.RSM_REMOVE_ITEM: {
      const { id, option, removeFrom } = action.data;
      const existing = state.getIn([id, removeFrom]);
      const updated = existing.toOrderedSet().remove(option).toList();
      const merged = state.setIn([id, removeFrom], updated);
      return merged;
    }
    case C.RSM_MERGE_OPTIONS_UI: {
      const { id, optionsUI } = action.data;
      const existing = state.getIn([id, 'optionsUI']);
      const updated = existing.toOrderedSet().union(optionsUI.toOrderedSet()).toList();
      const merged = state.setIn([id, 'optionsUI'], updated);
      return merged;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
