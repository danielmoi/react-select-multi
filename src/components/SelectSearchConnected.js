// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapWithClickout from 'react-clickout';
import { fromJS } from 'immutable';

import SelectSearchBase from './SelectSearchBase';
import {
  addSelect,
  toggleOpen,
  saveSelected,
  saveSearch,
  removeSelect,
  saveOptionsUI,
} from '../redux/actions';

import type { Options, Selected, Callback, Styles, DefaultStyles } from '../types';

type SelectSearchConnectedProps = {
  // config
  id: string,
  isMultipleSelect: boolean,
  isSearchable: boolean,

  // data / appearance
  prefix: string,
  label: string,
  placeholder: string,
  optionsUI: Options,
  initialSelected: Array<string>,
  styles: Styles,

  // methods
  toggleOpen: Callback,
  addSelect: Callback,
  saveSelected: Callback,
  removeSelect: Callback,
  handleSearch: Callback,
  saveOptionsUI: Callback,
  saveSearch: Callback,

  // dynamic
  isOpen: boolean,
  selected: Selected,
  searchTerm: string,
};

type SelectSearchConnectedDefaultProps = {
  // config
  isMultipleSelect: false,
  isSearchable: false,

  // data / appearance
  label: '',
  placeholder: '',
  styles: DefaultStyles,

  // dynamic
  isOpen: false,
  searchTerm: '',
};

export class SelectSearchConnectedComponent extends Component {
  defaultProps: SelectSearchConnectedDefaultProps;
  props: SelectSearchConnectedProps;

  componentDidMount() {
    const { id } = this.props;
    this.props.addSelect({ id });
  }

  componentWillUnmount() {
    const { id } = this.props;
    this.props.removeSelect({ id });
  }

  handleOptionClick = (option: Object) => () => {
    const { id, selected } = this.props;
    let updatedSelected = [];
    const toAdd = fromJS({
      id: option.get('id'),
      display: option.get('display'),
    });
    updatedSelected = selected.push(toAdd);
    this.props.saveSelected({ id, selected: updatedSelected });

    this.props.handleSearch({ search: this.props.searchTerm });
  }

  handleSelectedClick = (option: Object) => () => {
    const { id, selected } = this.props;
    const updatedSelected = selected.filter(s => s.get('id') !== option.get('id'));
    this.props.saveSelected({ id, selected: updatedSelected });
    this.props.handleSearch({ search: this.props.searchTerm });
  }

  onToggleOpen = () => {
    this.props.toggleOpen({ id: this.props.id, isOpen: !this.props.isOpen });
  }

  handleClickout = () => {
    if (!this.props.isOpen) return;
    this.props.toggleOpen({ id: this.props.id, isOpen: false });
  }

  handleSearch = (searchTerm: string) => {
    if (!this.props.isOpen) {
      this.props.toggleOpen({ id: this.props.id, isOpen: true });
    }
    this.props.saveSearch({ id: this.props.id, searchTerm });
    this.props.handleSearch({ search: searchTerm });
  }

  render() {
    return (
      <SelectSearchBase
        id={this.props.id}
        isMultipleSelect={this.props.isMultipleSelect}
        isSearchable={this.props.isSearchable}
        label={this.props.label}
        placeholder={this.props.placeholder}
        options={this.props.optionsUI}
        styles={this.props.styles}
        toggleOpen={this.onToggleOpen}
        handleOptionClick={this.handleOptionClick}
        handleSelectedClick={this.handleSelectedClick}
        isOpen={this.props.isOpen}
        selected={this.props.selected}
        searchTerm={this.props.searchTerm}
        handleSearch={this.handleSearch}
        prefix={this.props.prefix}
      />);
  }
}

const mapStateToProps = (state, ownProps) => ({
  isOpen: state.select.getIn([ownProps.id, 'isOpen']),
  selected: state.select.getIn([ownProps.id, 'selected']),
  optionsUI: state.select.getIn([ownProps.id, 'optionsUI']),
  searchTerm: state.select.getIn([ownProps.id, 'searchTerm']),
});

const mapDispatchToProps = {
  addSelect,
  toggleOpen,
  saveSelected,
  saveSearch,
  removeSelect,
  saveOptionsUI,
};

const Wrapped = wrapWithClickout(SelectSearchConnectedComponent);

const connected = connect(mapStateToProps, mapDispatchToProps)(Wrapped);

export default connected;
