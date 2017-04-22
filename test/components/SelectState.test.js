import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { stub, spy } from 'sinon';

import options from '../fixtures/options';
import styles from '../fixtures/styles';
import H from '../helpers/index';

import { SelectStateComponent } from '../../src/components/SelectState';
import SelectBase from '../../src/components/SelectBase';

describe('<SelectState />', () => {
  it('calls componentDidMount', () => {
    const spyCDM = spy(SelectStateComponent.prototype, 'componentDidMount');
    expect(spyCDM.callCount).to.equal(0);
    mount(
      <SelectStateComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
      />,
    );

    expect(spyCDM.callCount).to.equal(1);
    spyCDM.restore();
  });

  it('calls componentWillReceiveProps', () => {
    const spyCWRP = spy(SelectStateComponent.prototype, 'componentWillReceiveProps');
    expect(spyCWRP.callCount).to.equal(0);
    const wrapper = mount(
      <SelectStateComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
      />,
    );

    wrapper.setProps({ options });
    expect(spyCWRP.callCount).to.equal(1);
    spyCWRP.restore();
  });

  it('renders appropriately', () => {
    const wrapper = mount(
      <SelectStateComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
      />,
    );

    expect(wrapper.find(SelectBase).length).to.equal(1);
    expect(wrapper.find('.rsm-wrapper').length).to.equal(1);
  });

  it('toggles isOpen state upon clicking control', () => {
    const wrapper = mount(
      <SelectStateComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
      />,
    );

    expect(wrapper.find(SelectBase).length).to.equal(1);
    expect(wrapper.state('isOpen')).to.equal(false);
    expect(wrapper.state('options')).to.deep.equal(options);

    // show options
    wrapper.find('.rsm-control__container').simulate('click');
    expect(wrapper.state('isOpen')).to.equal(true);

    // hide options
    wrapper.find('.rsm-control__container').simulate('click');
    expect(wrapper.state('isOpen')).to.equal(false);
  });

  it('calls onCheck callback when option checkbox is clicked', () => {
    const onCheckStub = stub();
    const onCheck = stub().returns(() => onCheckStub());

    const wrapper = mount(
      <SelectStateComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={onCheck}
      />,
    );
    expect(onCheckStub.callCount).to.equal(0);

    // show options
    wrapper.find('.rsm-control__container').simulate('click');

    // click checkbox
    wrapper.find('input').at(0).simulate('change', { target: { checked: true } });

    expect(onCheckStub.callCount).to.equal(1);
  });

  it('renders a checked checkbox when selected props includes its tag', () => {
    const wrapper = mount(
      <SelectStateComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
      />,
    );

    // show options
    wrapper.find('.rsm-control__container').simulate('click');

    expect(wrapper.find('input').get(0).checked).to.equal(false);

    // set selected to have first checkbox's tag
    wrapper.setProps({ selected: [options[0].tag] });

    expect(wrapper.find('input').get(0).checked).to.equal(true);
  });

  it('sets state.isOpen to false when handleClickout is invoked', () => {
    const wrapper = mount(
      <SelectStateComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
      />,
    );

    wrapper.find('.rsm-control__container').simulate('click');
    expect(wrapper.state('isOpen')).to.equal(true);

    const wrapped = wrapper.instance();

    wrapped.handleClickout();
    expect(wrapper.state('isOpen')).to.equal(false);
  });
});
