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

  // methods
  toggleOpen: Callback,
  onCheck: Callback,
  handleSearch: Callback,

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

  handleSearch = (e) => {
    this.props.handleSearch(e.target.value);
  }

  render() {
    const { id, label, options, selected,
      isMultipleSelect, isSearchable, isOpen,
      toggleOpen, handleAdd, searchTerm, placeholder,
      styles, // if you pass in styles it will overrwrite the classnames
      handleSearch, handleRemove,
    } = this.props;

    const arrowStyles = {
      [styles.expandIcon]: !isOpen,
      [styles.collapseIcon]: isOpen,
    };

    let selectedLength;

    if ((Map.isMap(selected) || List.isList(selected)) && !Array.isArray(selected)) {
      selectedLength = selected.size;
    }

    if (Array.isArray(selected)) {
      selectedLength = selected.length;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.label}>
          {label}
        </div>

        <div
          className="om-select-multi__display-container"
          onClick={this.handleSearch}
        >
          <div className="om-select-multi__display-selected">
            {selected && selected.map(s => {
              return (
                <div
                  key={`${s.get('id')}--selected`}
                  className="om-select-multi__display-item"
                  onClick={handleRemove(s)}
                >
                  {s.get('display')}
                </div>
              );
            })}
          </div>
          <input
            type="text"
            className="om-select-multi__search-input"
            autoFocus
            onChange={this.handleSearch}
          />
        </div>


        {isOpen
        ?
          <div className="rsm-open-wrapper">
            {
              options && options.map(option => {
                return (
                <div
                  key={`${option.get('id')}--option`}
                  className={styles.optionContainer}
                >
                  <input
                    id={`${option.get('id')}--option`}
                    className={styles.optionCheckbox}
                    type="checkbox"
                    checked={selected.has(option.get('id'))}
                    onChange={handleAdd(option)}
                  />
                  <label
                    htmlFor={`${option.get('id')}--option`}
                    className={styles.optionBar}
                  >
                    {option.get('display')}
                  </label>
                </div>
              )})
            }
          </div>
        :
          null
        }

      </div>
    );
  }
}

export default SelectSearchBase;
