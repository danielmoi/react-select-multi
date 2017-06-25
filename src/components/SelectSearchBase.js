// @flow
import React, { Component } from 'react';

import type { Options, Selected, Callback } from '../types';

type SelectSearchBaseProps = {
  // config
  id: string,

  // appearance
  label: string,
  placeholder: string,
  prefix: string,

  // data
  isOpen: boolean,
  searchTerm: string,
  options: Options,
  selected: Selected,

  // methods
  handleSearch: Callback,
  handleSelectedClick: Callback,
  handleOptionClick: Callback,
};

class SelectSearchBase extends Component {
  props: SelectSearchBaseProps;

  handleSearch = (e: Object) => {
    this.props.handleSearch(e.target.value);
  }

  render() {
    const { label, options, selected,
      isOpen,
      placeholder = 'Type to search',
      handleOptionClick, handleSelectedClick,
      prefix,
    } = this.props;

    const selectedLength = (selected && selected.size) || (selected && selected.length);

    return (
      <div className={`${prefix}__wrapper`}>
        <div className={`${prefix}__label`}>
          {label}
        </div>

        <div className={`${prefix}__display-container`}>
          <div className={`${prefix}__display-selected`}>
            {selectedLength && selected.map(s => (
              <div
                key={`${s.get('id')}--selected`}
                className={`${prefix}__display-item`}
                onClick={handleSelectedClick(s)}
              >
                {s.get('display')}
              </div>
            ))}
          </div>

          <input
            type="text"
            className={`${prefix}__search-input`}
            autoFocus
            onChange={this.handleSearch}
            onClick={this.handleSearch}
            placeholder={placeholder}
          />
        </div>


        {isOpen && options
        ?
          <div className={`${prefix}__open-wrapper`}>
            {options.map(option => (
              <div
                key={`${option.get('id')}--option`}
                className={`${prefix}__option-container`}
              >
                <input
                  id={`${option.get('id')}--option`}
                  className={`${prefix}__option-checkbox`}
                  type="checkbox"
                  checked={selected.has(option.get('id'))}
                  onChange={handleOptionClick(option)}
                />
                <label
                  htmlFor={`${option.get('id')}--option`}
                  className={`${prefix}__search-option-bar`}
                >
                  {option.get('display')}
                </label>
              </div>
            ))}
          </div>
        :
          null
        }

      </div>
    );
  }
}

export default SelectSearchBase;
