import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { stub, spy } from 'sinon';

import options from './fixtures/options';
import styles from './fixtures/styles';
import H from './helpers/index';

import SelectComponent from '../src/SelectComponent';

describe('<SelectComponent />', () => {
  it('renders appropriately', () => {
    const wrapper = shallow(
      <SelectComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[options[0]]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
      />,
    );

    expect(wrapper.find(`.${styles.wrapper}`).length).to.equal(1);
    expect(wrapper.find(`.${styles.expandIcon}`).length).to.equal(1);
  });

  it('calls props.toggleOpen when control is clicked', () => {
    const toggleOpenStub = stub();
    const wrapper = shallow(
      <SelectComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[options[0]]}
        styles={styles}
        toggleOpen={toggleOpenStub}
        onCheck={H.NOOP}
      />,
    );

    wrapper.find(`.${styles.control}`).simulate('click');
    expect(toggleOpenStub.callCount).to.equal(1);
  });

  it('renders options list when props.isOpen is true', () => {
    const wrapper = shallow(
      <SelectComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[options[0]]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
      />,
    );

    wrapper.setProps({ isOpen: true });

    // check that options are open
    expect(wrapper.find('.rsm-open-wrapper').length).to.equal(1);

    // check that there are checkboxes and options (labels)
    expect(wrapper.find('input[type="checkbox"]').length).to.equal(options.length);
    expect(wrapper.find(`.${styles.optionContainer}`).length).to.equal(options.length);

    // check that each option has the correct display text
    expect(wrapper.find(`.${styles.optionContainer}`).at(0).find('label')
      .text()).to.equal(options[0].display);
    expect(wrapper.find(`.${styles.optionContainer}`).at(1).find('label')
      .text()).to.equal(options[1].display);
    expect(wrapper.find(`.${styles.optionContainer}`).at(2).find('label')
      .text()).to.equal(options[2].display);
    expect(wrapper.find(`.${styles.optionContainer}`).at(3).find('label')
      .text()).to.equal(options[3].display);
  });
});
