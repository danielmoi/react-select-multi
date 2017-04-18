import { fromJS } from 'immutable';
import C from './constants';
import initialState from './initial_state';

export default (state = fromJS(initialState), action) => {
  switch (action.type) {
    case C.RSM_ADD_SELECT: {
      const { id } = action.data;
      if (!id) return state;
      return state.merge({
        [id]: { isOpen: false, selected: [], searchTerm: '' },
      });
    }
    case C.RSM_TOGGLE_OPEN: {
      const { id, isOpen } = action.data;
      return state.mergeIn([id, 'isOpen'], isOpen);
    }
    case C.RSM_SEARCH_OPTIONS: {
      const { id, searchTerm } = action.data;
      return state.mergeIn([id, 'searchTerm'], searchTerm);
    }
    case C.RSM_SAVE_SELECTED: {
      const { id, selected } = action.data;
      return state.setIn([id, 'selected'], selected);
    }
    case C.RSM_REMOVE_SELECT: {
      const { id } = action.data;
      return state.delete(id);
    }
    default: {
      return state;
    }
  }
};
