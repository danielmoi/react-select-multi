import React, { PropTypes } from 'react';
import classNames from 'classnames';

export const basePropTypes = {
  uniqueKey: PropTypes.string.isRequired,
  isMultipleSelect: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.array,
    // also accept Immutable List (which has .includes method)
    PropTypes.object,
  ]).isRequired,
  onCheck: PropTypes.func.isRequired,
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
  onSearch: () => {},
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
  isMultipleSelect, isSearchable, isOpen,
  toggleOpen, onCheck, onSearch, placeholder,
  styles, // if you pass in styles it will overrwrite the classnames
}) => {
  const arrowStyles = {
    [styles.expandIcon]: !isOpen,
    [styles.collapseIcon]: isOpen,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        {label}
      </div>

      <div
        className={styles.controlContainer}
        onClick={toggleOpen}
      >
        {selected.length > 0
          ? options.filter(o => selected.includes(o.tag)).map(o => o.display).join(', ')
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
                  onChange={onCheck(option.tag, isMultipleSelect)}
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

SelectBase.propTypes = basePropTypes;
SelectBase.defaultProps = baseDefaultProps;

export default SelectBase;
