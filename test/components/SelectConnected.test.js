import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { stub, spy } from 'sinon';

import options from '../fixtures/options';
import styles from '../fixtures/styles';
import H from '../helpers/index';

import { SelectConnectedComponent } from '../../src/components/SelectConnected';
import SelectBase from '../../src/components/SelectBase';

describe('<SelectConnected />', () => {
  it('renders a SelectBase', () => {
    const wrapper = shallow(
      <SelectConnectedComponent
        id="category"
        uniqueKey="select-multi-1"
        options={options}
        initialSelected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        addSelect={H.NOOP}
        removeSelect={H.NOOP}
        saveSelected={H.NOOP}
      />,
    );
    expect(wrapper.find(SelectBase).length).to.equal(1);
  });

  it('calls componentDidMount', () => {
    const spyCWM = spy(SelectConnectedComponent.prototype, 'componentDidMount');
    const addSelectStub = stub();

    expect(spyCWM.callCount).to.equal(0);

    mount(
      <SelectConnectedComponent
        id="category"
        uniqueKey="select-multi-1"
        options={options}
        initialSelected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        addSelect={addSelectStub}
        removeSelect={H.NOOP}
        saveSelected={H.NOOP}
      />,
    );

    expect(spyCWM.callCount).to.equal(1);
    expect(addSelectStub.callCount).to.equal(1);
    spyCWM.restore();
  });

  it('calls componentWillReceiveProps', () => {
    const spyCWRP = spy(SelectConnectedComponent.prototype, 'componentWillReceiveProps');
    const saveSelectedStub = stub();

    expect(spyCWRP.callCount).to.equal(0);

    const wrapper = mount(
      <SelectConnectedComponent
        id="category"
        uniqueKey="select-multi-1"
        options={options}
        initialSelected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        saveSelected={saveSelectedStub}
        addSelect={H.NOOP}
        removeSelect={H.NOOP}
      />,
    );

    wrapper.setProps({
      id: 'category',
      initialSelected: ['hotdogs', 'buns'],
    });

    expect(spyCWRP.callCount).to.equal(1);
    expect(saveSelectedStub.callCount).to.equal(1);
    spyCWRP.restore();
  });

  it('calls componentWillUnmount', () => {
    const spyUnmount = spy(SelectConnectedComponent.prototype, 'componentWillUnmount');
    const removeSelectStub = stub();

    expect(spyUnmount.callCount).to.equal(0);

    const wrapper = mount(
      <SelectConnectedComponent
        id="category"
        uniqueKey="select-multi-1"
        options={options}
        initialSelected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        saveSelected={H.NOOP}
        addSelect={H.NOOP}
        removeSelect={removeSelectStub}
      />,
    );

    wrapper.unmount();

    expect(spyUnmount.callCount).to.equal(1);
    expect(removeSelectStub.callCount).to.equal(1);
    spyUnmount.restore();
  });

  it('calls toggleOpen when the control is clicked', () => {
    const toggleOpenStub = stub();
    const wrapper = mount(
      <SelectConnectedComponent
        id="category"
        uniqueKey="select-multi-1"
        options={options}
        initialSelected={[]}
        styles={styles}
        toggleOpen={toggleOpenStub}
        addSelect={H.NOOP}
        removeSelect={H.NOOP}
        saveSelected={H.NOOP}
      />,
    );
    wrapper.find('.rsm-control__container').simulate('click');
    expect(toggleOpenStub.callCount).to.equal(1);
  });

  it.only('handles clicking on an option checkbox', () => {
    const saveSelectedStub = stub();
    const wrapper = mount(
      <SelectConnectedComponent
        id="category"
        uniqueKey="select-multi-1"
        options={options}
        initialSelected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        addSelect={H.NOOP}
        removeSelect={H.NOOP}
        saveSelected={saveSelectedStub}
        isMultipleSelect={false}
      />,
    );
    wrapper.setProps({ isOpen: true });

    wrapper.find('input[type="checkbox"]').at(0).simulate('change', { target: { checked: true } });
    expect(saveSelectedStub.callCount).to.equal(1);
    console.log('wrapper.debug():', wrapper.debug());
  });
});
