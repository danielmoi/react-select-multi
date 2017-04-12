import { fromJS } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import wrapWithClickout from 'react-clickout';
import {
  addSet,
  toggleOpen,
  takeValue,
  searchOptions,
} from './redux/actions';
import { updateValues } from './utils';
import SelectComponent, { propTypes, defaultProps } from './SelectComponent';

export class Select extends Component {
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

  onChange = value => () => {
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
      <SelectComponent
        options={this.props.options}
        selected={this.props.selected || fromJS([])}
        label={this.props.label}
        name={this.props.name}
        identifier={this.props.identifier}
        onChange={this.onChange}
        onSearch={this.onSearch}
        toggleOpen={this.onToggleOpen}
        isOpen={this.props.isOpen}
        isMultipleSelect={this.props.isMultipleSelect}
        isSearchable={this.props.isSearchable}
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

Select.proptypes = {
  options: propTypes.options,
  selected: propTypes.selected,
  defaultValues: PropTypes.array.isRequired,
  label: propTypes.label,
  name: PropTypes.string.isRequired,
  identifier: propTypes.identifier,
  toggleOpen: PropTypes.func.isRequired,
  searchOptions: PropTypes.func.isRequired,
  takeValue: PropTypes.func.isRequired,
  isOpen: propTypes.isOpen,
  isMultipleSelect: propTypes.isMultipleSelect,
  isSearchable: propTypes.isSearchable,
  styles: propTypes.styles,
};
Select.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(wrapWithClickout(Select));
