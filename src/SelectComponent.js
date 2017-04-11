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

const getStyleOrDefault = (styleName, styles) =>
  styles[styleName] ? { className: styles[styleName] } : { styleName: defaultStyles[styleName] };

const Select = ({
  identifier, label, options, searchTerm,
  isMultipleSelect, isSearchable, isOpen,
  toggleOpen, onChange, onSearch,
  styles, // if you pass in styles it will overrwrite the classnames
}) => {
  const arrowStyles = {
    [styles.expandOptions || defaultStyles.downArrow]: !isOpen,
    [styles.closeOptions || defaultStyles.upArrow]: isOpen,
  };

  return (
    <div {...getStyleOrDefault('wrapper', styles)}>
      <div {...getStyleOrDefault('label', styles)}>
        {label}
      </div>

      <div
        {...getStyleOrDefault('control', styles)}
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
              {...getStyleOrDefault('search', styles)}
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
              {
                isMultipleSelect ?
                  <input
                    id={`${styles.checkbox}-${identifier}--${index}`}
                    className={styles.checkbox}
                    type="checkbox"
                    checked={o.selected}
                    onChange={onChange(o.tag)}
                  /> : null
              }
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
