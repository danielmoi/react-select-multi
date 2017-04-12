import React, { Component } from 'react';
import wrapWithClickout from 'react-clickout';
import SelectComponent, { propTypes, defaultProps } from './SelectComponent';

class SelectState extends Component {
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
        uniqueKey={this.props.uniqueKey}
        isMultipleSelect={this.props.isMultipleSelect}
        label={this.props.label}
        options={this.state.options}
        selected={this.props.selected || []}
        isOpen={this.state.isOpen}
        isSearchable={this.props.isSearchable}
        toggleOpen={this.toggleOpen}
        onCheck={this.props.onCheck}
        onSearch={this.props.onSearch}
        styles={this.props.styles}
      />
    );
  }
}

SelectState.propTypes = {
  uniqueKey: propTypes.uniqueKey,
  label: propTypes.label,
  isMultipleSelect: propTypes.isMultipleSelect,
  isSearchable: propTypes.isMultipleSelect,
  onCheck: propTypes.onCheck,
  onSearch: propTypes.onSearch,
  options: propTypes.options,
  selected: propTypes.selected,
  styles: propTypes.styles,
};

SelectState.defaultProps = defaultProps;

export default wrapWithClickout(SelectState);
