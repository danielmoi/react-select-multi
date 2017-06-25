import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { sandbox, stub, spy } from 'sinon';
import { fromJS } from 'immutable';

import options from '../fixtures/options';
import styles from '../fixtures/styles';
import H from '../helpers/index';

import { SelectSearchConnectedComponent } from '../../src/components/SelectSearchConnected';
import SelectSearchBase from '../../src/components/SelectSearchBase';

describe('<SelectSearchConnected />', () => {
  beforeEach(() => {
    sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('renders a SelectSearchBase', () => {
    const wrapper = shallow(
      <SelectSearchConnectedComponent
        id="categories"
        label=""
        prefix=""
        placeholder=""

        isOpen={false}
        searchTerm=""
        optionsUI={fromJS([])}
        selected={fromJS([])}

        addSelect={H.VOID}
        removeSelect={H.VOID}
        saveSelected={H.VOID}
        toggleOpen={H.VOID}
        handleSearch={H.VOID}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}
      />,
    );
    expect(wrapper.find(SelectSearchBase).length).to.equal(1);
  });

  it('handles componentDidMount', () => {
    const spyCDM = spy(SelectSearchConnectedComponent.prototype, 'componentDidMount');
    const addSelectStub = stub();
    mount(
      <SelectSearchConnectedComponent
        id="categories"
        label=""
        prefix=""
        placeholder=""

        isOpen={false}
        searchTerm=""
        optionsUI={fromJS([])}
        selected={fromJS([])}

        addSelect={addSelectStub}
        removeSelect={H.VOID}
        saveSelected={H.VOID}
        toggleOpen={H.VOID}
        handleSearch={H.VOID}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}
      />,
    );
    expect(addSelectStub.callCount).to.equal(1);
    expect(spyCDM.callCount).to.equal(1);
  });

  it('handles componentWillUnmount', () => {
    const removeSelectStub = stub();
    const wrapper = mount(
      <SelectSearchConnectedComponent
        id="categories"
        label=""
        prefix=""
        placeholder=""

        isOpen={false}
        searchTerm=""
        optionsUI={fromJS([])}
        selected={fromJS([])}

        addSelect={H.VOID}
        removeSelect={removeSelectStub}
        saveSelected={H.VOID}
        toggleOpen={H.VOID}
        handleSearch={H.VOID}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}
      />,
    );

    wrapper.unmount();
    expect(removeSelectStub.callCount).to.equal(1);
  });

  it('calls toggleOpen when handleClickout is invoked', () => {
    const toggleOpenStub = stub();
    const wrapper = mount(
      <SelectSearchConnectedComponent
        id="categories"
        label=""
        prefix=""
        placeholder=""

        isOpen={false}
        searchTerm=""
        optionsUI={fromJS([])}
        selected={fromJS([])}

        addSelect={H.VOID}
        removeSelect={H.VOID}
        saveSelected={H.VOID}
        toggleOpen={toggleOpenStub}
        handleSearch={H.VOID}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}
      />,
    );
    const wrapped = wrapper.instance();
    wrapped.handleClickout();
    expect(toggleOpenStub.callCount).to.equal(0);

    wrapper.setProps({ isOpen: true });
    wrapped.handleClickout();
    expect(toggleOpenStub.callCount).to.equal(1);
  });
});
