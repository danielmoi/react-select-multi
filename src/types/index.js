/* @flow */

import type {
  Map,
  List,
} from 'immutable';

/* ---------------------- REDUX ------------------------ */
export type Action = {
  type: string,
  data: Object,
};

export type ActionCreator = (any) => Action;

export type DataState = Map<string, ? any> ;

export type Reducer = (state: DataState, action: Action) => DataState;

/* ----------------------- GENERAL ----------------------- */
export type Callback = (any) => any;

/* ------------------------ SELECT OPTIONS ---------------------- */
export type Option = {
  tag: string,
  display: string,
};

export type Options = Array<Option> | List<Option>;

export type Selected = Array<string> | List<string> | Map<string>;

/* ---------------------- STYLES ------------------------ */
export type StylesTypes = {
  wrapper: string,
  label: string,
  controlContainer: string,
  controlPlaceholder: string,
  searchContainer: string,
  searchInput: string,
  expandIcon: string,
  collapseIcon: string,
  optionContainer: string,
  optionBar: string,
  optionCheckbox: string,
};

export type DefaultStylesTypes = {
  wrapper: string,
  label: string,
  controlContainer: string,
  controlPlaceholder: string,
  searchContainer: string,
  searchInput: string,
  expandIcon: string,
  collapseIcon: string,
  optionContainer: string,
  optionBar: string,
  optionCheckbox: string,
};

export const DefaultProps = {
  wrapper: 'rsm-wrapper',
  label: 'rsm-label',
  controlContainer: 'rsm-control__container',
  controlPlaceholder: 'rsm-control__placeholder',
  searchContainer: 'rsm-search__container',
  searchInput: 'rsm-search__input',
  expandIcon: 'rsm-arrow-down',
  collapseIcon: 'rsm-arrow-up',
  optionContainer: 'rsm-option__container',
  optionBar: 'rsm-option__bar',
  optionCheckbox: 'rsm-option__checkbox',
};
