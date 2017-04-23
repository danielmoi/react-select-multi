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

export type DataState = Map<string, ? any> ;

export type Reducer = (state: DataState, action: Action) => DataState;

export type Callback = (any) => any;

export type Option = {
  tag: string,
  display: string,
};

export type Options = Array<Option> | List<Option>;

export type Selected = Array<string> | List<string> | Map<string>;
