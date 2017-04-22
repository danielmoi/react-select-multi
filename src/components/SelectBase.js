// @flow

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Map, List } from 'immutable';

import type { SelectBaseProps } from '../types';

const additionalPropTypes = {
  onCheck: PropTypes.func.isRequired,
};

export const basePropTypes = {
  uniqueKey: PropTypes.string.isRequired,
  isMultipleSelect: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object, // Immutable
  ]).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object, // Immutable
  ]),
  searchTerm: PropTypes.string,
  isOpen: PropTypes.bool,
  isSearchable: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  styles: React.PropTypes.shape({
    wrapper: React.PropTypes.string,
    label: React.PropTypes.string,
    search: React.PropTypes.string,
    expandIcon: React.PropTypes.string,
    collapseIcon: React.PropTypes.string,
    optionContainer: React.PropTypes.string,
    optionBar: React.PropTypes.string,
    optionCheckbox: React.PropTypes.string,
  }),
};

export const baseDefaultProps = {
  isMultipleSelect: false,
  label: '',
  placeholder: '',
  searchTerm: '',
  isOpen: false,
  isSearchable: false,
  onSearch: () => { },
  selected: [],
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
};

const SelectBase = ({
  uniqueKey, label, options, selected, searchTerm,
  isSearchable, isOpen,
  toggleOpen, onCheck, onSearch, placeholder,
  styles, // if you pass in styles it will overrwrite the classnames
}: SelectBaseProps) => {
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
            <input
              value={searchTerm}
              className={styles.search}
              placeholder="Search"
              onChange={onSearch}
            />
            : null }
          {
            options.map(option => (
              <div
                key={`${uniqueKey}-${option.tag}`}
                className={styles.optionContainer}
              >
                <input
                  id={`${styles.checkbox}-${uniqueKey}--${option.tag}`}
                  className={styles.optionCheckbox}
                  type="checkbox"
                  checked={selected.includes(option.tag)}
                  onChange={onCheck(option.tag)}
                />
                <label
                  htmlFor={`${styles.checkbox}-${uniqueKey}--${option.tag}`}
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
};

SelectBase.propTypes = Object.assign({}, basePropTypes, additionalPropTypes);
SelectBase.defaultProps = baseDefaultProps;

export default SelectBase;
