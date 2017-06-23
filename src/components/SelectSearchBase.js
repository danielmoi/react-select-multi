// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Map, List } from 'immutable';

import type { Options, Selected, Callback, Styles, DefaultStyles } from '../types';

type SelectSearchBaseProps = {
  // config
  id: string,
  isMultipleSelect: boolean,
  isSearchable: boolean,

  // data / appearance
  label: string,
  placeholder: string,
  options: Options,
  styles: Styles,
  prefix: string,

  // methods
  toggleOpen: Callback,
  onCheck: Callback,
  handleSearch: Callback,
  handleOptionClick: Callback,
  handleSelectedClick: Callback,

  // dynamic
  isOpen: boolean,
  selected: Selected,
  searchTerm: string,
};

type SelectSearchBaseDefaultProps = {
  styles: DefaultStyles,
}

class SelectSearchBase extends Component {
  defaultProps: SelectSearchBaseDefaultProps;
  props: SelectSearchBaseProps;

  handleSearch = (e: Object) => {
    this.props.handleSearch(e.target.value);
  }

  render() {
    const { label, options, selected,
      isOpen,
      toggleOpen,
      placeholder = 'Type to search',
      handleOptionClick, handleSelectedClick,
      prefix = 'rsm',
    } = this.props;

    const arrowStyles = {
      [`${prefix}__arrow-down`]: !isOpen,
      [`${prefix}__arrow-up`]: isOpen,
    };

    let selectedLength;

    if ((Map.isMap(selected) || List.isList(selected)) && !Array.isArray(selected)) {
      selectedLength = selected.size;
    }

    if (Array.isArray(selected)) {
      selectedLength = selected.length;
    }

    return (
      <div className={`${prefix}__wrapper`}>
        <div className={`${prefix}__label`}>
          {label}
        </div>

        <div className={`${prefix}__display-container`}>
          <div className="om-select-multi__display-selected">
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
