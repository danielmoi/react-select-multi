// @flow

import React, { Component } from 'react';
import wrapWithClickout from 'react-clickout';
import SelectBase, { basePropTypes, baseDefaultProps } from './SelectBase';
import type { SelectState, SelectBaseProps, SelectStateDefaultProps } from '../types';

export class SelectStateComponent extends
  Component<SelectStateDefaultProps, SelectBaseProps, SelectState> {
  static defaultProps: SelectStateDefaultProps;
  static props: SelectBaseProps;

  constructor(props: SelectBaseProps) {
    super(props);
    this.state = {
      isOpen: false,
      options: props.options,
    };
  }
  state: SelectState;

  componentDidMount() {
    this.state = {
      isOpen: false,
      options: this.props.options,
    };
  }

  componentWillReceiveProps(nextProps: SelectBaseProps) {
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
        uniqueKey={this.props.uniqueKey}
        isMultipleSelect={this.props.isMultipleSelect}
        isSearchable={this.props.isSearchable}
        label={this.props.label}
        placeholder={this.props.placeholder}
        options={this.state.options}
        selected={this.props.selected}
        isOpen={this.state.isOpen}
        toggleOpen={this.toggleOpen}
        onCheck={this.props.onCheck}
        onSearch={this.props.onSearch}
        styles={this.props.styles}
      />
    );
  }
}

SelectStateComponent.propTypes = basePropTypes;
SelectStateComponent.defaultProps = baseDefaultProps;

const wrapped = wrapWithClickout(SelectStateComponent);

export default wrapped;
