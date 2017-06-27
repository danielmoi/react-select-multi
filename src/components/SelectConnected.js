// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapWithClickout from 'react-clickout';

import SelectBase from './SelectBase';
import {
  addSelect,
  toggleOpen,
  setSelected,
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
  setSelected: Callback,
  removeSelect: Callback,

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

export class SelectConnectedComponent extends Component {
  defaultProps: SelectConnectedDefaultProps;
  props: SelectConnectedProps;

  componentDidMount() {
    const { id } = this.props;
    this.props.addSelect({ id });
  }

  componentWillReceiveProps(nextProps: SelectConnectedProps) {
    const { id, initialSelected } = nextProps;
    if (nextProps.initialSelected[0] !== this.props.initialSelected[0]) {
      this.props.setSelected({ id, selected: initialSelected });
    }
  }

  componentWillUnmount() {
    const { id } = this.props;
    this.props.removeSelect({ id });
  }

  onCheck = (checkboxValue: string) => () => {
    const { id, selected, isMultipleSelect } = this.props;
    let updatedSelected = [];
    if (isMultipleSelect) {
      if (selected.includes(checkboxValue)) {
        updatedSelected = selected.filter(s => s !== checkboxValue);
      } else {
        updatedSelected = [...selected, checkboxValue];
      }
      this.props.setSelected({ id, selected: updatedSelected });
    } else {
      // not multipleSelect
      this.props.setSelected({ id, selected: [checkboxValue] });
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

  render() {
    return (
      <SelectBase
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
  setSelected,
  removeSelect,
};

const Wrapped = wrapWithClickout(SelectConnectedComponent);

const connected = connect(mapStateToProps, mapDispatchToProps)(Wrapped);

export default connected;
