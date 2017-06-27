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
        id="category-select"
        options={options}
        initialSelected={[]}
        selected={[]}
        styles={styles}
        toggleOpen={H.VOID}
        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={H.VOID}
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
        id="category-select"
        options={options}
        initialSelected={[]}
        selected={[]}
        styles={styles}
        toggleOpen={H.VOID}
        addSelect={addSelectStub}
        removeSelect={H.VOID}
        setSelected={H.VOID}
      />,
    );

    expect(spyCWM.callCount).to.equal(1);
    expect(addSelectStub.callCount).to.equal(1);
    spyCWM.restore();
  });

  it('calls componentWillReceiveProps', () => {
    const spyCWRP = spy(SelectConnectedComponent.prototype, 'componentWillReceiveProps');
    const setSelectedStub = stub();

    expect(spyCWRP.callCount).to.equal(0);

    const wrapper = mount(
      <SelectConnectedComponent
        id="category-select"
        options={options}
        initialSelected={[]}
        selected={[]}
        styles={styles}
        toggleOpen={H.VOID}
        setSelected={setSelectedStub}
        addSelect={H.VOID}
        removeSelect={H.VOID}
      />,
    );

    wrapper.setProps({
      id: 'category',
      initialSelected: ['hotdogs', 'buns'],
    });

    expect(spyCWRP.callCount).to.equal(1);
    expect(setSelectedStub.callCount).to.equal(1);
    spyCWRP.restore();
  });

  it('calls componentWillUnmount', () => {
    const spyUnmount = spy(SelectConnectedComponent.prototype, 'componentWillUnmount');
    const removeSelectStub = stub();

    expect(spyUnmount.callCount).to.equal(0);

    const wrapper = mount(
      <SelectConnectedComponent
        id="category-select"
        options={options}
        initialSelected={[]}
        selected={[]}
        styles={styles}
        toggleOpen={H.VOID}
        setSelected={H.VOID}
        addSelect={H.VOID}
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
        id="category-select"
        options={options}
        initialSelected={[]}
        styles={styles}
        toggleOpen={toggleOpenStub}
        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={H.VOID}
      />,
    );
    wrapper.find('.rsm-control__container').simulate('click');
    expect(toggleOpenStub.callCount).to.equal(1);
  });

  it('handles clicking on an option checkbox – Single Select', () => {
    const setSelectedStub = stub();
    const toggleOpenStub = stub();
    const wrapper = mount(
      <SelectConnectedComponent
        id="category-select"
        options={options}
        initialSelected={[]}
        selected={[]}
        styles={styles}
        toggleOpen={toggleOpenStub}
        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={setSelectedStub}
        isMultipleSelect={false}
      />,
    );
    wrapper.setProps({ isOpen: true });

    wrapper.find('input[type="checkbox"]').at(0).simulate('change', { target: { checked: true } });
    expect(setSelectedStub.callCount).to.equal(1);
    expect(toggleOpenStub.callCount).to.equal(1);
  });

  it('handles clicking on an option checkbox – Multiple Select', () => {
    const setSelectedStub = stub();
    const calledWith = setSelectedStub.args;
    const toggleOpenStub = stub();

    const wrapper = mount(
      <SelectConnectedComponent
        id="category-select"
        options={options}
        initialSelected={[]}
        selected={[]}
        styles={styles}
        toggleOpen={toggleOpenStub}
        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={setSelectedStub}
        isMultipleSelect
      />,
    );
    wrapper.setProps({ isOpen: true });

    // selected: []
    // click 'hotdogs'
    wrapper.find('input[type="checkbox"]').at(0).simulate('change', { target: { checked: true } });
    expect(setSelectedStub.callCount).to.equal(1);
    expect(toggleOpenStub.callCount).to.equal(0);
    expect(calledWith[0][0].id).to.equal('category-select');
    expect(calledWith[0][0].selected).to.deep.equal([options[0].tag]);


    // selected: ['hotdogs']
    wrapper.setProps({ selected: [options[0].tag] });
    // click 'buns'
    wrapper.find('input[type="checkbox"]').at(1).simulate('change', { target: { checked: true } });
    expect(setSelectedStub.callCount).to.equal(2);
    expect(calledWith[1][0].id).to.equal('category-select');
    expect(calledWith[1][0].selected).to.deep.equal([options[0].tag, options[1].tag]);

    // selected: ['hotdogs']
    wrapper.setProps({ selected: [options[0].tag] });
    // click 'hotdogs'
    wrapper.find('input[type="checkbox"]').at(0).simulate('change', { target: { checked: true } });
    expect(setSelectedStub.callCount).to.equal(3);
    expect(calledWith[2][0].id).to.equal('category-select');
    expect(calledWith[2][0].selected).to.deep.equal([]);
  });

  it('calls toggleOpen when handleClickout is invoked', () => {
    const toggleOpenStub = stub();

    const wrapper = mount(
      <SelectConnectedComponent
        id="category-select"
        options={options}
        initialSelected={[]}
        selected={[]}
        styles={styles}
        toggleOpen={toggleOpenStub}
        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={H.VOID}
        isMultipleSelect
      />,
    );

    const wrapped = wrapper.instance();

    wrapper.setProps({ isOpen: false });
    wrapped.handleClickout();
    expect(toggleOpenStub.callCount).to.equal(0);

    wrapper.setProps({ isOpen: true });
    wrapped.handleClickout();
    expect(toggleOpenStub.callCount).to.equal(1);
  });
});
