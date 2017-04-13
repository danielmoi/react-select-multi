# React Select Multi

[![npm version](https://badge.fury.io/js/react-select-multi.svg)](https://badge.fury.io/js/react-select-multi) [![Build Status](https://travis-ci.org/danielmoi/react-select-multi.svg?branch=master)](https://travis-ci.org/danielmoi/react-select-multi) [![Coverage Status](https://coveralls.io/repos/github/danielmoi/react-select-multi/badge.svg)](https://coveralls.io/github/danielmoi/react-select-multi)

## Description
A versatile React Component providing awesome select UI components.
- simple = basic select
- multiple = multi-select
- search = select with search input

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
    <SelectState
      uniqueKey="select-multi-1"
      options={options}
      selected={selected}
      styles={styles}
      toggleOpen={toggleOpen}
      onCheck={onCheck}
    />
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
    <SelectConnected
      uniqueKey="select-multi-1"
      options={options}
      selected={selected}
      styles={styles}
      toggleOpen={toggleOpen}
      onCheck={onCheck}
    />
  }
}

```

----
## Tests
```
yarn spec
```


----
## Credits

Thanks to [Lyn](https://github.com/lyntco), [JD](https://github.com/johndagostino), [Mike](https://github.com/Scoutski), [Anoop](https://github.com/anupvarghese), [🌳](https://github.com/alexlogs) 🎉🎉🎉🎉

----
## Licence

[Apache-2.0](LICENSE.txt)
