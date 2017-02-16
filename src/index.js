import React, { PropTypes, Component } from 'react';

const propTypes = {
  options: PropTypes.array.isRequired,
  identifier: PropTypes.string.isRequired,
  saveValue: PropTypes.func.isRequired,
  label: PropTypes.string,
  namespace: PropTypes.string,
};

const defaultProps = {
  label: '',
  namespace: 'react',
};

class SelectMulti extends Component {
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

  // TODO: Switch out option into component > Checkbox / Panel only
  // TODO: Switch out control into component > Display / Search-input

  render() {
    const { namespace, identifier, saveValue, label } = this.props;

    return (
      <div className={`${namespace}-select-multi__wrapper`}>
        <div className={`${namespace}-select-multi__label`}>
          {label}
        </div>

        <div
          className={`${namespace}-select-multi__control`}
          onClick={this.toggleOpen}
        >
          {this.state.options.filter(o => o.selected).map(o => o.display).join(', ')}
        </div>

        {this.state.isOpen
          ?
            this.state.options.map((o, index) => (
              <div
                key={`${identifier}-${index}`}
                className={`${namespace}-select-multi__option-container`}
              >
                <input
                  id={`${namespace}-select-multi__checkbox-${identifier}--${index}`}
                  className={`${namespace}-select-multi__checkbox`}
                  type="checkbox"
                  checked={o.selected}
                  onChange={saveValue(o.tag)}
                />
                <label
                  htmlFor={`${namespace}-select-multi__checkbox-${identifier}--${index}`}
                  className={`${namespace}-select-multi__option`}
                >
                  {o.display}
                </label>
              </div>
            ))

          :
            null
        }

      </div>
    );
  }
}

SelectMulti.propTypes = propTypes;

SelectMulti.defaultProps = defaultProps;

export default SelectMulti;
