// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapWithClickout from 'react-clickout';

import SelectSearchBase from './SelectSearchBase';
import {
  addSelect,
  toggleOpen,
  saveSelected,
  saveSearch,
  removeSelect,
} from '../redux/actions';

import type { Options, Selected, Callback } from '../types';

type SelectSearchConnectedProps = {
  // config
  id: string,

  // appearance
  label: string,
  prefix: string,
  placeholder: string,

  // data
  isOpen: boolean,
  searchTerm: string,
  optionsUI: Options,
  selected: Selected,

  // connected methods
  addSelect: Callback,
  removeSelect: Callback,
  saveSelected: Callback,

  toggleOpen: Callback,
  handleSearch: Callback,
  saveSearch: Callback,
  handleSelectedClick: Callback,
  handleOptionClick: Callback,
};

type SelectSearchConnectedDefaultProps = {
  // appearance
  label: '',
  placeholder: '',
  prefix: 'rsm',

  // data
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
    this.props.handleOptionClick({ selectId: this.props.id, option });
  }

  handleSelectedClick = (option: Object) => () => {
    this.props.handleSelectedClick({ selectId: this.props.id, option });
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
        label={this.props.label}
        prefix={this.props.prefix}
        placeholder={this.props.placeholder}
        options={this.props.optionsUI}
        selected={this.props.selected}
        searchTerm={this.props.searchTerm}
        isOpen={this.props.isOpen}
        handleOptionClick={this.handleOptionClick}
        handleSelectedClick={this.handleSelectedClick}
        handleSearch={this.handleSearch}
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
};

const Wrapped = wrapWithClickout(SelectSearchConnectedComponent);

const connected = connect(mapStateToProps, mapDispatchToProps)(Wrapped);

export default connected;
