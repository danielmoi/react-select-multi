import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import wrapWithClickout from 'react-clickout';
import {
  addSet,
  toggleOpen,
  selectValue,
  searchValues,
} from './redux/actions';
import SelectComponent, { propTypes, defaultProps } from './SelectComponent';

export class Select extends Component {
  componentWillMount() {
    this.props.addSet({ name: this.props.name });
  }

  onChange = value => () => {
    const { name, selected } = this.props;
    if (this.props.isMultipleSelect) {
      if (selected.includes(value)) {
        this.props.selectValue({
          name, values: selected.filter(val => val !== value),
        });
      } else {
        this.props.selectValue({ name, values: selected.concat(value) });
      }
    } else {
      this.props.selectValue({ name, values: [value] });
      this.props.toggleOpen({ name: this.props.name, open: false });
    }
  }

  onSearch = text => () => {}

  onToggleOpen = () => {
    this.props.toggleOpen({ name: this.props.name, open: !this.props.isOpen });
  }

  handleClickout = () => {
    if (!this.props.isOpen) return;
    this.props.toggleOpen({ name: this.props.name, open: false });
  }

  componentWillUnMount() {
    this.props.clearAll();
  }

  render() {
    return (
      <SelectComponent
        options={this.props.options}
        selected={this.props.selected}
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
  selected: state.select.getIn([ownProps.name, 'selected']) || [],
});

const mapDispatchToProps = {
  addSet,
  toggleOpen,
  selectValue,
  searchValues,
};

Select.proptypes = {
  options: propTypes.options,
  selected: propTypes.selected,
  label: propTypes.label,
  name: PropTypes.string.isRequired,
  identifier: propTypes.identifier,
  toggleOpen: PropTypes.func.isRequired,
  searchValues: PropTypes.func.isRequired,
  selectValue: PropTypes.func.isRequired,
  isOpen: propTypes.isOpen,
  isMultipleSelect: propTypes.isMultipleSelect,
  isSearchable: propTypes.isSearchable,
  styles: propTypes.styles,
};
Select.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(wrapWithClickout(Select));