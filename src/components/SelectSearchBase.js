// @flow
import React, { Component } from 'react';

import type { Options, Selected, Callback } from '../types';

type SelectSearchBaseProps = {
  // config
  id: string,
  isMultipleSelect: boolean,

  // appearance
  label: string,
  placeholder: string,
  prefix: string,
  useImages: boolean,

  // data
  isOpen: boolean,
  searchTerm: string,
  options: Options,
  selected: Selected,

  // methods
  handleSearch: Callback,
  handleSelectedClick: Callback,
  handleOptionClick: Callback,
  handleScroll: Callback,
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
      handleScroll,
      useImages,
      isMultipleSelect,
      searchTerm = '',
    } = this.props;

    const selectedLength = (selected && selected.size) || (selected && selected.length);

    let optionsAvailable = !!options;
    if (!isMultipleSelect) {
      if (selectedLength === 1) {
        optionsAvailable = false;
      }
    }

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

          {isMultipleSelect || optionsAvailable ?
            <input
              type="text"
              className={`${prefix}__search-input`}
              autoFocus
              onChange={this.handleSearch}
              onClick={this.handleSearch}
              placeholder={placeholder}
              value={searchTerm}
            />
          : null }
        </div>


        {isOpen && options
          ?
            <div
              className={`${prefix}__open-wrapper`}
              onScroll={handleScroll}
            >
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

                  {useImages
                  ?
                    <label
                      htmlFor={`${option.get('id')}--option`}
                      className={`${prefix}__search-option-bar`}
                    >
                      <img
                        src={option.get('src')} alt={option.get('display')}
                        className={`${prefix}__search-option-bar-image`}
                      />
                      <div className={`${prefix}__search-option-bar-text`}>
                        {option.get('display')}
                      </div>
                    </label>
                  :
                    <label
                      htmlFor={`${option.get('id')}--option`}
                      className={`${prefix}__search-option-bar`}
                    >
                      <div className={`${prefix}__search-option-bar-text`}>
                        {option.get('display')}
                      </div>
                    </label>
                }


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
