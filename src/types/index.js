/* @flow */

import type {
  Map,
  List,
} from 'immutable';

export type Action = {
  type: string,
  data: Object,
};

export type FSA = (any) => Action;

export type DataState = Map < string, ? any > ;

export type Reducer = (state: DataState, action: Action) => DataState;

export type Callback = (any) => any;

export type Option = {
  tag: string,
  display: string,
};

export type SelectBaseProps = {
  uniqueKey: string,
  label: string,
  options: Array < Option > | List < Option >,
  selected: Array < string > | List < string > | Map < string,
  ?
  any >,
  searchTerm ? : string,
  isMultipleSelect : boolean,
  isSearchable: boolean,
  isOpen: boolean,
  toggleOpen: Callback,
  onCheck: Callback,
  onSearch: ? Callback,
  placeholder: string,
  styles: Object,
  name ? : string,
  defaultValues ? : Array < string >,
  taskeValue ? : Callback,
};

export type SelectStateProps = {
  uniqueKey: string,
  label: string,
  options: Array < Option > | List < Option >,
  selected: Array < string > | List < string > | Map < string,
  ?
  any >,
  searchTerm ? : string,
  isMultipleSelect : boolean,
  isSearchable: boolean,
  isOpen: boolean,
  toggleOpen: Callback,
  onCheck: Callback,
  onSearch: ? Callback,
  placeholder: string,
  styles: Object,
  name ? : string,
  defaultValues ? : Array < string >,
  taskeValue ? : Callback,
};

export type SelectConnectedProps = {
  uniqueKey: string,
  id: string,
  label: string,
  options: Array<Option> | List<Option>,
  selected: Array<string> | List<string> | Map<string,
  ?
  any>,
  searchTerm?: string,
  initialSelected: Array<string>,
  isMultipleSelect: boolean,
  isSearchable: boolean,
  isOpen: boolean,
  toggleOpen: Callback,
  onCheck: Callback,
  onSearch: ? Callback,
  placeholder: string,
  styles: Object,
  name: string,
  defaultValues: Array < string >,
  takeValue: Callback,
  addSet: Callback,
  clearAll: Callback,
  saveSelected: Callback,
  removeSelect: Callback,
  addSelect: Callback,
};

export type SelectConnectedDefaultProps = {
  label: string,
  searchTerm ? : string,
  isMultipleSelect : boolean,
  isSearchable: boolean,
  isOpen: boolean,
  onSearch: ? Callback,
  placeholder: string,
  styles: Object,
};

export type SelectStateDefaultProps = {
  label: string,
  searchTerm?: string,
  isMultipleSelect: boolean,
  isSearchable: boolean,
  isOpen: boolean,
  onSearch: ? Callback,
  placeholder: string,
  styles: Object,
};


export type SelectState = {
  isOpen: boolean,
  options: Array<Option> | List<Option>,
};
