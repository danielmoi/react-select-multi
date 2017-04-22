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

export type SelectState = {
  isOpen: boolean,
  options: Array<Option> | List<Option>,
};

/* ---------------------- CONNECTED ------------------------ */
export type SelectConnectedProps = {
  uniqueKey: string,
  id: string,
  label: string,
  options: Array<Option> | List<Option>,
  selected: Array<string> | List<string> | Map<string, any>,
  searchTerm?: string,
  initialSelected: Array<string>,
  isMultipleSelect: boolean,
  isSearchable: boolean,
  isOpen: boolean,
  toggleOpen: Callback,
  onCheck: Callback,
  placeholder: string,
  styles: Object,

  addSelect: Callback,
  saveSelected: Callback,
  removeSelect: Callback,
};

export type SelectConnectedDefaultProps = {
  label: string,
  searchTerm ? : string,
  isMultipleSelect : boolean,
  isSearchable: boolean,
  isOpen: boolean,
  placeholder: string,
  styles: Object,
};


/* ---------------------- STATE ------------------------ */
export type SelectStateProps = {
  uniqueKey: string,
  id: string,
  label: string,
  isMultipleSelect : boolean,
  options: Array < Option > | List < Option >,
  selected: Array < string > | List < string > | Map < string, any>,
  searchTerm ? : string,
  isSearchable: boolean,
  isOpen: boolean,
  toggleOpen: Callback,
  placeholder: string,
  styles: Object,

  onCheck: Callback,
};

export type SelectStateDefaultProps = {
  label: string,
  searchTerm?: string,
  isMultipleSelect: boolean,
  isSearchable: boolean,
  isOpen: boolean,
  placeholder: string,
  styles: Object,
};

/* ---------------------- BASE ------------------------ */
export type SelectBaseProps = {
  uniqueKey: string,
  isMultipleSelect : boolean,
  label: string,
  placeholder: string,
  options: Array < Option > | List < Option >,
  selected: Array < string > | List < string > | Map < string, any >,
  searchTerm ? : string,
  isOpen: boolean,
  isSearchable: boolean,
  toggleOpen: Callback,
  styles: Object,

  onCheck: Callback,
};
