import { fromJS } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import wrapWithClickout from 'react-clickout';

import {
  addSet,
  toggleOpen,
  takeValue,
  searchOptions,
} from '../redux/actions';
import { updateValues } from '../utils';
import SelectBase, { basePropTypes, baseDefaultProps } from './SelectBase';

const additionalPropTypes = {
  // defaultValues: PropTypes.array.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  takeValue: PropTypes.func.isRequired,
};

export class SelectConnectedComponent extends Component {
  componentWillMount() {
    const { name } = this.props;
    this.props.addSet({ name });
  }

  componentWillReceiveProps(nextProps) {
    const { name, defaultValues, selected } = nextProps;
    // check if only selected crap is changing
    if (selected) return;
    this.props.takeValue({ name, values: defaultValues });
  }

  onCheck = value => () => {
    updateValues(this.props, value);
  }

  onSearch = text => () => {}

  onToggleOpen = () => {
    this.props.toggleOpen({ name: this.props.name, isOpen: !this.props.isOpen });
  }

  handleClickout = () => {
    if (!this.props.isOpen) return;
    this.props.toggleOpen({ name: this.props.name, isOpen: false });
  }

  componentWillUnMount() {
    this.props.clearAll();
  }

  render() {
    return (
      <SelectBase
        uniqueKey={this.props.uniqueKey}
        isMultipleSelect={this.props.isMultipleSelect}
        isSearchable={this.props.isSearchable}
        label={this.props.label}
        options={this.props.options}
        selected={this.props.selected || fromJS([])}
        isOpen={this.props.isOpen}
        toggleOpen={this.onToggleOpen}
        onCheck={this.onCheck}
        onSearch={this.onSearch}
        styles={this.props.styles}
      />);
  }
}

const mapStateToProps = (state, ownProps) => ({
  isOpen: state.select.getIn([ownProps.name, 'isOpen']) || false,
  selected: state.select.getIn([ownProps.name, 'selected']),
});

const mapDispatchToProps = {
  addSet,
  toggleOpen,
  takeValue,
  searchOptions,
};

SelectConnectedComponent.propTypes = Object.assign({}, basePropTypes, additionalPropTypes);
SelectConnectedComponent.defaultProps = baseDefaultProps;

const connected = connect(mapStateToProps, mapDispatchToProps)(
  wrapWithClickout(SelectConnectedComponent));

export default connected;
