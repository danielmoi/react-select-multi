import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { stub, spy } from 'sinon';

import { options } from './fixtures';

import SelectComponent from '../src/SelectComponent';

console.log('HELLO');
describe('<SelectComponent />', () => {
  it.only('renders appropriately', () => {
    const wrapper = shallow(
      <SelectComponent
        options={options}
        selected={[options[0]]}
      />,
    );
    console.log('wrapper.debug():', wrapper.debug());
  });
});
