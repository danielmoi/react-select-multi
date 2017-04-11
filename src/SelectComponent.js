import React, { PropTypes } from 'react';
import classNames from 'classnames';

export const propTypes = {
  options: PropTypes.array.isRequired,
  identifier: PropTypes.string.isRequired,
  label: PropTypes.string,
  searchTerm: PropTypes.string,
  isOpen: PropTypes.bool,
  isMultipleSelect: PropTypes.bool,
  isSearchable: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  styles: React.PropTypes.shape({
    wrapper: React.PropTypes.string,
    label: React.PropTypes.string,
    search: React.PropTypes.string,
    checkbox: React.PropTypes.string,
    expandOptions: React.PropTypes.string,
    closeOptions: React.PropTypes.string,
    optionContainer: React.PropTypes.string,
    option: React.PropTypes.string,
  }),
};

export const defaultProps = {
  label: '',
  searchTerm: '',
  isOpen: false,
  isMultipleSelect: false,
  isSearchable: false,
  onSearch: () => {},
  styles: {},
};

const Select = ({
  identifier, label, options, searchTerm,
  isSearchable, isOpen,
  toggleOpen, onChange, onSearch,
  styles, // if you pass in styles it will overrwrite the classnames
}) => {
  const arrowStyles = {
    [styles.expandOptions]: !isOpen,
    [styles.closeOptions]: isOpen,
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
        {options.filter(o => o.selected).map(o => o.display).join(', ')}
        <span className={classNames(arrowStyles)} />
      </div>
      {isOpen
        ?
        <div>
          { isSearchable ?
            <input
              value={searchTerm}
              className={styles.search}
              placeholder="Search"
              onChange={onSearch}
            />
            : null }
          {
            options.map((o, index) => (
            <div
              key={`${identifier}-${index}`}
              className={styles.optionContainer}
            >
              <input
                id={`${styles.checkbox}-${identifier}--${index}`}
                className={styles.checkbox}
                type="checkbox"
                checked={selected.includes(o.tag)}
                onChange={onChange(o.tag)}
              />
              <label
                htmlFor={`${styles.checkbox}-${identifier}--${index}`}
                className={styles.option}
              >
                {o.display}
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
