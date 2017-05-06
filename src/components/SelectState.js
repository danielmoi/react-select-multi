// @flow
import React, { Component } from 'react';
import wrapWithClickout from 'react-clickout';

import SelectBase from './SelectBase';

import type { Options, Selected, Callback, Styles, DefaultStyles } from '../types';

type SelectStateProps = {
  // config
  id: string,
  isMultipleSelect: boolean,
  isSearchable: boolean,

  // data / appearance
  label: string,
  placeholder: string,
  options: Options,
  styles: Styles,

  // methods
  onCheck: Callback,

  // dynamic
  selected: Selected,
  searchTerm: string,
};

type SelectStateDefaultProps = {
  // config
  isMultipleSelect: false,
  isSearchable: false,

  // data / appearance
  label: '',
  placeholder: '',
  styles: DefaultStyles,

  // dynamic
  searchTerm: '',
};

type SelectStateState = {
  isOpen: boolean,
  options: Options,
}

export class SelectStateComponent extends Component {
  defaultProps: SelectStateDefaultProps;
  props: SelectStateProps;
  state: SelectStateState;

  constructor(props: SelectStateProps) {
    super(props);
    this.state = {
      isOpen: false,
      options: props.options,
    };
  }

  componentDidMount() {
    this.state = {
      isOpen: false,
      options: this.props.options,
    };
  }

  componentWillReceiveProps(nextProps: SelectStateProps) {
    if (nextProps.options) {
      this.setState({
        options: nextProps.options,
      });
    }
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleClickout = () => {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <SelectBase
        id={this.props.id}
        isMultipleSelect={this.props.isMultipleSelect}
        isSearchable={this.props.isSearchable}
        label={this.props.label}
        placeholder={this.props.placeholder}
        options={this.state.options}
        styles={this.props.styles}
        toggleOpen={this.toggleOpen}
        onCheck={this.props.onCheck}
        isOpen={this.state.isOpen}
        selected={this.props.selected}
        searchTerm={this.props.searchTerm}
      />
    );
  }
}

const Wrapped = wrapWithClickout(SelectStateComponent);

export default Wrapped;
