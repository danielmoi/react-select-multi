// @flow
import React, { Component } from 'react';
import classNames from 'classnames';

import { Map, List } from 'immutable';
// import type { Options, Selected, Callback, Styles, DefaultStyles } from '../types';
import type { Options, Selected, Callback } from '../types';
import stylesheet from '../styles/style.css';

console.log('*****************');
console.log('stylesheet:', stylesheet);
console.log('stylesheet.wrapper:', stylesheet.wrapper);



export const defaultStyles = {
  wrapper: 'rsm-wrapper',
  label: 'rsm-label',
  controlContainer: 'rsm-control__container',
  controlPlaceholder: 'rsm-control__placeholder',
  searchContainer: 'rsm-search__container',
  searchInput: 'rsm-search__input',
  expandIcon: 'rsm-arrow-down',
  collapseIcon: 'rsm-arrow-up',
  optionContainer: 'rsm-option__container',
  optionBar: 'rsm-option__bar',
  optionCheckbox: 'rsm-option__checkbox',
};

type Props = {
  // config
  id: string,
  isMultipleSelect: boolean,
  isSearchable: boolean,

  // data / appearance
  label: string,
  placeholder: string,
  options: Options,
  styles: typeof defaultStyles,

  // methods
  toggleOpen: Callback,
  onCheck: Callback,

  // dynamic
  isOpen: boolean,
  selected: Selected,
  searchTerm: string,
};


type DefaultProps = {
  styles: typeof defaultStyles,
};


class SelectBase extends Component<DefaultProps, Props, void> {
  static defaultProps = {
    styles: defaultStyles,
  }

  handleSearch = (e) => {
    this.props.onSearch(e.target.value);
  }

  render() {
    // console.log('this.props:', this.props);
    const { id, label, options, selected,
      isMultipleSelect, isSearchable, isOpen,
      toggleOpen, onCheck, searchTerm, placeholderControl, placeholderSearch, // if you pass in styles it will overrwrite the classnames
    } = this.props;



    const styles = this.props.styles ? this.props.styles : stylesheet;

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
      <div className={styles.wrapper || stylesheet.wrapper}>
        <div className={styles.label || stylesheet.label}>
          {label}
        </div>

        <div // eslint-disable-line
          className={styles.controlContainer}
          onClick={toggleOpen}
        >
          {
            selectedLength
            ?
            options.filter(o => selected.includes(o.tag))
                .map(o => o.display).join(', ')
            :
            <div className={styles.controlPlaceholder}>
              {placeholderControl}
            </div>
          }
          <span className={classNames(arrowStyles)} />
        </div>
        {isOpen
        ?
          <div className="rsm-open-wrapper">
            {isSearchable
              ?
                <div className={styles.searchContainer}>
                  <input
                    className={styles.searchInput}
                    autoFocus
                    onChange={this.handleSearch}
                    placeholder={placeholderSearch}
                  />
                </div>
              : null
            }

            {
              options.map(option => (
                <div
                  key={`${id}-${option.tag}`}
                  className={styles.optionContainer}
                >
                  <input
                    id={`${id}--${option.tag}`}
                    className={styles.optionCheckbox}
                    type="checkbox"
                    checked={selected.includes(option.tag)}
                    onChange={onCheck(option.tag, isMultipleSelect)}
                  />
                  <label
                    htmlFor={`${id}--${option.tag}`}
                    className={styles.optionBar}
                  >
                    {option.display}
                  </label>
                </div>
              ))
            }
          </div>
        :
          null
        }

      </div>
    );
  }
}

export default SelectBase;
