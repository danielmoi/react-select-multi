// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Map, List } from 'immutable';

import type { Options, Selected, Callback } from '../types';

type SelectBaseProps = {
  // config
  id: string,
  isMultipleSelect: boolean,
  isSearchable: boolean,

  // data / appearance
  label: string,
  placeholder: string,
  options: Options,
  styles: Object,

  // methods
  toggleOpen: Callback,
  onCheck: Callback,

  // dynamic
  isOpen: boolean,
  selected: Selected,
  searchTerm: string,
};

type SelectBaseDefaultProps = {
  styles: {
    wrapper: 'rsm-wrapper',
    label: 'rsm-label',
    controlContainer: 'rsm-control__container',
    controlPlaceholder: 'rsm-control__placeholder',
    search: 'rsm-search',
    expandIcon: 'rsm-arrow-down',
    collapseIcon: 'rsm-arrow-up',
    optionContainer: 'rsm-option__container',
    optionBar: 'rsm-option__bar',
    optionCheckbox: 'rsm-option__checkbox',
  },
}

class SelectBase extends Component {
  defaultProps: SelectBaseDefaultProps;
  props: SelectBaseProps;

  render() {
    const { id, label, options, selected,
      isMultipleSelect, isSearchable, isOpen,
      toggleOpen, onCheck, searchTerm, placeholder,
      styles, // if you pass in styles it will overrwrite the classnames
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

        <div // eslint-disable-line
          className={styles.controlContainer}
          onClick={toggleOpen}
        >
          {
            selectedLength ?
            options.filter(o => selected.includes(o.tag)).map(o => o.display).join(', ')
            : <div className={styles.controlPlaceholder}>{placeholder}</div>
          }
          <span className={classNames(arrowStyles)} />
        </div>
        {isOpen
        ?
          <div className="rsm-open-wrapper">
            { isSearchable ?
              <div className={styles.search}>
                {searchTerm}
              </div>
              : null }
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
