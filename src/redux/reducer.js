import { fromJS } from 'immutable';
import C from './constants';
import initialState from './initial_state';

export default (state = fromJS(initialState), action) => {
  switch (action.type) {
    case C.SELECT_TOGGLE_OPEN: {
      const { name, open } = action.data;
      return state.merge({
        [name]: Object.assign(state.get(name) || {}, { isOpen: open }),
      });
    }
    case C.SELECT_SEARCH_VALUES: {
      const { name, searchText } = action.data;
      return state.merge({
        [name]: Object.assign(state.get[name] || {}, { searchTerm: searchText }),
      });
    }
    case C.SELECT_TAKE_VALUE: {
      const { name, values } = action.data;
      return state.merge({
        [name]: Object.assign(state.get[name] || {}, { values }),
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
