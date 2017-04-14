/* @flow */

import type { Map } from 'immutable';

export type Action = {
  type: String,
  data: Object,
};

export type FSA = (any) => Action;

export type DataState = Map<string, ?any>;

export type Reducer = (state: DataState, action: Action) => DataState;

