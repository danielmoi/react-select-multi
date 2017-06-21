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
  searchOptions,
  removeSelect,
} from '../redux/actions';

import type { Options, Selected, Callback, Styles, DefaultStyles } from '../types';

type SelectConnectedProps = {
  // config
  id: string,
  isMultipleSelect: boolean,
  isSearchable: boolean,

  // data / appearance
  label: string,
  placeholder: string,
  options: Options,
  initialSelected: Array<string>,
  styles: Styles,

  // methods
  toggleOpen: Callback,
  addSelect: Callback,
  saveSelected: Callback,
  removeSelect: Callback,
  handleSearch: Callback,

  // dynamic
  isOpen: boolean,
  selected: Selected,
  searchTerm: string,
};

type SelectConnectedDefaultProps = {
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
  defaultProps: SelectConnectedDefaultProps;
  props: SelectConnectedProps;

  componentDidMount() {
    const { id } = this.props;
    this.props.addSelect({ id });
  }

  componentWillReceiveProps(nextProps: SelectConnectedProps) {
    // if (nextProps.initialSelected.length !== this.props.initialSelected.length) {
    //   this.props.saveSelected({ id, selected: initialSelected });
    // }
  }

  componentWillUnmount() {
    const { id } = this.props;
    this.props.removeSelect({ id });
  }

  onCheck = (option) => () => {
    const { id, selected, isMultipleSelect } = this.props;

    let updatedSelected = [];
    if (isMultipleSelect) {
      if (selected.has(option.get('id'))) {
        updatedSelected = selected.filter(s => s !== option.get('id'));
      } else {
        const toAdd = fromJS({
          id: option.get('id'),
          display: option.get('display'),
        });
        updatedSelected = selected.push(toAdd);
      }
      this.props.saveSelected({ id, selected: updatedSelected });
    } else {
      // not multipleSelect
      this.props.saveSelected({ id, selected: [option] });
      this.props.toggleOpen({ id, isOpen: false });
    }
  }

  onToggleOpen = () => {
    this.props.toggleOpen({ id: this.props.id, isOpen: !this.props.isOpen });
  }

  handleClickout = () => {
    if (!this.props.isOpen) return;
    this.props.toggleOpen({ id: this.props.id, isOpen: false });
  }

  handleSearch = (search) => {
    if (!this.props.isOpen) {
      this.props.toggleOpen({ id: this.props.id, isOpen: true });
    }
    this.props.handleSearch(search);
  }

  render() {
    return (
      <SelectSearchBase
        id={this.props.id}
        isMultipleSelect={this.props.isMultipleSelect}
        isSearchable={this.props.isSearchable}
        label={this.props.label}
        placeholder={this.props.placeholder}
        options={this.props.options}
        styles={this.props.styles}
        toggleOpen={this.onToggleOpen}
        onCheck={this.onCheck}
        isOpen={this.props.isOpen}
        selected={this.props.selected}
        searchTerm={this.props.searchTerm}
        handleSearch={this.handleSearch}
      />);
  }
}

const mapStateToProps = (state, ownProps) => ({
  isOpen: state.select.getIn([ownProps.id, 'isOpen']) || false,
  selected: state.select.getIn([ownProps.id, 'selected']),
});

const mapDispatchToProps = {
  addSelect,
  toggleOpen,
  saveSelected,
  searchOptions,
  removeSelect,
};

const Wrapped = wrapWithClickout(SelectSearchConnectedComponent);

const connected = connect(mapStateToProps, mapDispatchToProps)(Wrapped);

export default connected;
