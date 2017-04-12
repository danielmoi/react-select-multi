import React, { PropTypes } from 'react';
import classNames from 'classnames';

export const propTypes = {
  uniqueKey: PropTypes.string.isRequired,
  isMultipleSelect: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
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

export const defaultProps = {
  isMultipleSelect: false,
  label: '',
  searchTerm: '',
  isOpen: false,
  isSearchable: false,
  onSearch: () => {},
  styles: {
    wrapper: 'rsm-wrapper',
    label: 'rsm-label',
    control: 'rsm-control',
    search: 'rsm-search',
    expandIcon: 'rsm-arrow-down',
    collapseIcon: 'rsm-arrow-up',
    optionContainer: 'rsm-option__container',
    optionBar: 'rsm-option__bar',
    optionCheckbox: 'rsm-option__checkbox',
  },
};

const Select = ({
  uniqueKey, label, options, selected, searchTerm,
  isMultipleSelect, isSearchable, isOpen,
  toggleOpen, onCheck, onSearch,
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
        className={styles.control}
        onClick={toggleOpen}
      >
        {options.filter(o => selected.includes(o.tag)).map(o => o.display).join(', ')}
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

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
