// @flow

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import wrapWithClickout from 'react-clickout';
import type {
  Map,
  List,
} from 'immutable';

import {
  addSelect,
  toggleOpen,
  saveSelected,
  searchOptions,
  removeSelect,
} from '../redux/actions';

import SelectBase, { basePropTypes, baseDefaultProps, styles } from './SelectBase';

// import type { SelectConnectedProps, SelectConnectedDefaultProps as DefaultProps } from '../types';

import type { Option, Callback } from '../types';

const additionalPropTypes = {
  id: PropTypes.string.isRequired,
  initialSelected: PropTypes.array.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  addSelect: PropTypes.func.isRequired,
  removeSelect: PropTypes.func.isRequired,
  saveSelected: PropTypes.func.isRequired,
};

type Styles = {
  wrapper: string,
  label: string,
  controlContainer: string,
  controlPlaceholder: string,
  search: string,
  expandIcon: string,
  collapseIcon: string,
  optionContainer: string,
  optionBar: string,
  optionCheckbox: string,
};

type SelectConnectedProps = {
  id: string,
  label: string,
  options: Array<Option> | List<Option>,
  selected: Array<string> | List<string> | Map<string, any>,
  initialSelected: Array<string>,
  isMultipleSelect: boolean,
  isSearchable: boolean,
  isOpen: boolean,
  toggleOpen: Callback,
  placeholder: string,
  styles: Styles,

  addSelect: Callback,
  saveSelected: Callback,
  removeSelect: Callback,
};

type SelectConnectedDefaultProps = {
  label: string,
  // isMultipleSelect : boolean,
  isSearchable: boolean,
  isOpen: boolean,
  placeholder: string,
  styles: Styles,
};

export class SelectConnectedComponent extends Component
<SelectConnectedDefaultProps, SelectConnectedProps, void> {

  static defaultProps = {
    isMultipleSelect: false,
    isSearchable: false,
    isOpen: false,
    placeholder: '',
    label: '',
    styles,
  };

  static props: SelectConnectedProps;

  componentDidMount() {
    const { id } = this.props;
    this.props.addSelect({ id });
  }

  componentWillReceiveProps(nextProps: SelectConnectedProps) {
    const { id, initialSelected } = nextProps;
    if (nextProps.initialSelected[0] !== this.props.initialSelected[0]) {
      this.props.saveSelected({ id, selected: initialSelected });
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
      this.props.saveSelected({ id, selected: updatedSelected });
    } else {
      // not multipleSelect
      this.props.saveSelected({ id, selected: [checkboxValue] });
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
        selected={this.props.selected}
        isOpen={this.props.isOpen}
        toggleOpen={this.onToggleOpen}
        onCheck={this.onCheck}
        styles={this.props.styles}
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

// SelectConnectedComponent.propTypes = Object.assign({}, basePropTypes, additionalPropTypes);
// SelectConnectedComponent.defaultProps = baseDefaultProps;

const Wrapped = wrapWithClickout(SelectConnectedComponent);

const connected = connect(mapStateToProps, mapDispatchToProps)(Wrapped);

export default connected;
