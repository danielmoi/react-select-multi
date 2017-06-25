# React Select Multi

[![npm version](https://badge.fury.io/js/react-select-multi.svg)](https://badge.fury.io/js/react-select-multi) [![Build Status](https://travis-ci.org/danielmoi/react-select-multi.svg?branch=master)](https://travis-ci.org/danielmoi/react-select-multi) [![Coverage Status](https://coveralls.io/repos/github/danielmoi/react-select-multi/badge.svg)](https://coveralls.io/github/danielmoi/react-select-multi)

## Description
A versatile React Component providing awesome UI select components.
- default = basic select (single option)
- isMultipleSelect = multiple select (multiple options)
- isSearchable = select with search input field

State management options
- React Component state
- [Redux](https://github.com/reactjs/redux/)

----
## Installation
With Yarn:
```
yarn add react-select-multi
```

With NPM:
```
npm install react-select-multi
```

----
## 1. Basic Usage (SelectState): uses component state for state management
```js
import React, { Component } from 'react';
import { SelectState } from 'react-select-multi';

class MyComponent extends Component {
  render() {
    return (
      <SelectState
        id="category-select"
        options={options}
        styles={styles}
        onCheck={onCheck}
        selected={selected}
      />
    );
  }
}

```

----
## 2. Basic Usage (SelectConnected): uses Redux for state management
```js
import React, { Component } from 'react';
import { SelectConnected } from 'react-select-multi';

class MyComponent extends Component {
  render() {
    return (
      <SelectConnected
        id="select-multi-1"
        options={options}
        initialSelected={initialSelected}
        styles={styles}
        selected={selected}
      />
    );
  }
}

```

----
## Configuration
- R: required
- ** (styles): see below

## Universal Properties

| Prop  | Type  | Default | Description |
|:--------- | :---- | :----   |:----  |
| `id`  | `string`  | R  | Unique identifier for the component |
| `isMultipleSelect`  | `boolean` | `false` | Enable multiple options to be selected
| `isSearchable`  | `boolean` | `false` | Enable search input for options |
| `label` | `string`  | `''`  | Label for component (above MultiSelect) |
| `placeholder` | `string` | `''` | Placeholder for control bar
| `options` | `array` | R | Options for MultiSelect
| `styles` | `object` | ** | CSS class names for MultiSelect


## SelectState Properties
| Prop  | Type  | Default | Description |
|:----- | :---- | :------ |:----------- |
| `selected` | `array` | `[]` | Options that are selected; keep this updated (in combination with `onCheck`) in order for selected options to be updated
| `onCheck` | `func` | R | Callback, invoked after an option is clicked, `onCheck(option.tag, isMultipleSelect)` |

## SelectConnected Properties
| Prop  | Type  | Default | Description |
|:----- | :---- | :------ |:----------- |
| `initialSelected` | `array` | `[]` | Options to be pre-selected


## Styles
Default classNames:
```js
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
};
```

----
## Tests

### Run flow check
```
yarn flow
```

### Run test suite
```
yarn spec
```

### Run with coverage report
```
yarn coverage
```

### Run linter
```
yarn lint
```

----
## Credits

Thanks to [Lyn](https://github.com/lyntco), [JD](https://github.com/johndagostino), [Mike](https://github.com/Scoutski), [AVOID](https://github.com/anupvarghese), and [🌳](https://github.com/alexlogs)

----
## Licence

[Apache-2.0](LICENSE.txt)
