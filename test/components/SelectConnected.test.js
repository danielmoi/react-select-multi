import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { stub, spy } from 'sinon';

import options from '../fixtures/options';
import styles from '../fixtures/styles';
import H from '../helpers/index';

import { SelectConnectedComponent } from '../../src/components/SelectConnected';
import SelectBase from '../../src/components/SelectBase';

describe('<SelectConnected />', () => {
  it('calls componentWillMount', () => {
    const spyCWM = spy(SelectConnectedComponent.prototype, 'componentWillMount');
    const addSetStub = stub();

    expect(spyCWM.callCount).to.equal(0);

    const wrapper = mount(
      <SelectConnectedComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
        defaultValues={[]}
        takeValue={H.NOOP}
        addSet={addSetStub}
      />,
    );

    console.log('wrapper.debug():', wrapper.debug());

    expect(spyCWM.callCount).to.equal(1);
    expect(addSetStub.callCount).to.equal(1);
    spyCWM.restore();
  });

  it('calls componentWillReceiveProps', () => {
    const spyCWRP = spy(SelectConnectedComponent.prototype, 'componentWillReceiveProps');
    const takeValueStub = stub();

    expect(spyCWRP.callCount).to.equal(0);

    const wrapper = mount(
      <SelectConnectedComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
        defaultValues={[]}
        takeValue={takeValueStub}
        addSet={H.NOOP}
      />,
    );

    wrapper.setProps({
      name: 'HELLO',
      defaultValues: ['ONE', 'TWO'],
    });

    expect(spyCWRP.callCount).to.equal(1);
    // expect(takeValueStub.callCount).to.equal(1);
    spyCWRP.restore();
  });

  it('calls componentWillUnmount', () => {
    const spyUnmount = spy(SelectConnectedComponent.prototype, 'componentWillUnmount');
    const clearAllStub = stub();

    expect(spyUnmount.callCount).to.equal(0);

    const wrapper = mount(
      <SelectConnectedComponent
        uniqueKey="select-multi-1"
        options={options}
        selected={[]}
        styles={styles}
        toggleOpen={H.NOOP}
        onCheck={H.NOOP}
        defaultValues={[]}
        takeValue={H.NOOP}
        addSet={H.NOOP}
        clearAll={clearAllStub}
      />,
    );

    wrapper.unmount();

    expect(spyUnmount.callCount).to.equal(1);
    expect(clearAllStub.callCount).to.equal(1);
    spyUnmount.restore();
  });
});
