import React, { Component } from 'react';
import wrapWithClickout from 'react-clickout';
import SelectComponent, { propTypes, defaultProps } from './SelectComponent';

class Select extends Component {
  constructor(props) {
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

  componentWillReceiveProps(nextProps) {
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
      <SelectComponent
        identifier={this.props.identifier}
        label={this.props.label}
        options={this.state.options}
        selected={this.state.selected || []}
        isOpen={this.state.isOpen}
        isMultipleSelect={this.props.isMultipleSelect}
        isSearchable={this.props.isSearchable}
        toggleOpen={this.toggleOpen}
        onChange={this.props.onChange}
        onSearch={this.props.onSearch}
        styles={this.props.styles}
      />
    );
  }
}

Select.propTypes = {
  identifier: propTypes.identifier,
  label: propTypes.label,
  isMultipleSelect: propTypes.isMultipleSelect,
  isSearchable: propTypes.isMultipleSelect,
  onChange: propTypes.onChange,
  onSearch: propTypes.onSearch,
  options: propTypes.options,
  selected: propTypes.selected,
  styles: propTypes.styles,
};

Select.defaultProps = defaultProps;

export default wrapWithClickout(Select);
