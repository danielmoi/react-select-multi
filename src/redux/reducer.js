import { fromJS } from 'immutable';
import C from './constants';
import initialState from './initial_state';

export default (state = fromJS(initialState), action) => {
  switch (action.type) {
    case C.SELECT_ADD_SET: {
      const { name } = action.data;
      if (!name) return state;
      return state.merge({
        [name]: { isOpen: false, selected: [] },
      });
    }
    case C.SELECT_TOGGLE_OPEN: {
      const { name, open } = action.data;
      return state.merge({
        [name]: (state.get(name) || fromJS({})).merge({ isOpen: open }),
      });
    }
    case C.SELECT_SEARCH_VALUES: {
      const { name, searchText } = action.data;
      return state.merge({
        [name]: (state.get(name) || fromJS({})).merge({ searchTerm: searchText }),
      });
    }
    case C.SELECT_TAKE_VALUE: {
      const { name, values } = action.data;
      return state.merge({
        [name]: (state.get(name) || fromJS({})).merge({ selected: values }),
      });
    }
    case C.SELECT_CLEAR_ALL: {
      return state.merge(
        fromJS(initialState.form),
      );
    }
    default: {
      return state;
    }
  }
};
