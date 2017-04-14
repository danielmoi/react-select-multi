import React, { PropTypes, Component } from 'react';
import wrapWithClickout from 'react-clickout';
import SelectBase, { basePropTypes, defaultProps } from './SelectBase';

const additionalPropTypes = {
  onCheck: PropTypes.func.isRequired,
};

export class SelectStateComponent extends Component {
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
      <SelectBase
        uniqueKey={this.props.uniqueKey}
        isMultipleSelect={this.props.isMultipleSelect}
        isSearchable={this.props.isSearchable}
        label={this.props.label}
        placeholder={this.props.placeholder}
        options={this.state.options}
        selected={this.props.selected || []}
        isOpen={this.state.isOpen}
        toggleOpen={this.toggleOpen}
        onCheck={this.props.onCheck}
        onSearch={this.props.onSearch}
        styles={this.props.styles}
      />
    );
  }
}

SelectStateComponent.propTypes = Object.assign({}, basePropTypes, additionalPropTypes);
SelectStateComponent.defaultProps = defaultProps;

const wrapped = wrapWithClickout(SelectStateComponent);

export default wrapped;
