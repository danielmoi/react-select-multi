import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { sandbox, stub, spy } from 'sinon';
import { fromJS } from 'immutable';

import { options, selected } from '../fixtures/options';
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
        options={fromJS([])}
        selected={fromJS([])}

        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={H.VOID}
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
        options={fromJS([])}
        selected={fromJS([])}

        addSelect={addSelectStub}
        removeSelect={H.VOID}
        setSelected={H.VOID}
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
        options={fromJS([])}
        selected={fromJS([])}

        addSelect={H.VOID}
        removeSelect={removeSelectStub}
        setSelected={H.VOID}
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
        options={fromJS([])}
        selected={fromJS([])}

        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={H.VOID}
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

  it('calls handleSearch upon search input', () => {
    const toggleOpenStub = stub();
    const saveSearchStub = stub();
    const handleSearchStub = stub();
    const wrapper = mount(
      <SelectSearchConnectedComponent
        id="categories"
        label=""
        prefix="cookie-search"
        placeholder=""

        isOpen={false}
        searchTerm=""
        options={fromJS([])}
        selected={fromJS([])}

        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={H.VOID}
        toggleOpen={toggleOpenStub}
        handleSearch={handleSearchStub}
        saveSearch={saveSearchStub}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}
      />,
    );

    const input = wrapper.find('.cookie-search__search-input');
    input.simulate('change', { target: { value: 'Chocolate' } });

    expect(toggleOpenStub.callCount).to.equal(1);
    expect(saveSearchStub.callCount).to.equal(1);
    expect(handleSearchStub.callCount).to.equal(1);
  });

  it('calls handleOptionClick upon clicking option', () => {
    const handleOptionClickStub = stub();
    const wrapper = mount(
      <SelectSearchConnectedComponent
        id="categories"
        label=""
        prefix="cookie-search"
        placeholder=""

        isOpen
        searchTerm=""
        options={fromJS(options)}
        selected={fromJS([])}

        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={H.VOID}
        toggleOpen={H.VOID}
        handleSearch={H.VOID}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={handleOptionClickStub}
      />,
    );

    const option = wrapper.find('.cookie-search__option-checkbox').at(0);
    option.simulate('change');

    expect(handleOptionClickStub.callCount).to.equal(1);
  });

  it('calls handleSelectedClick upon clicking selected item', () => {
    const handleSelectedClickStub = stub();
    const wrapper = mount(
      <SelectSearchConnectedComponent
        id="categories"
        label=""
        prefix="cookie-search"
        placeholder=""

        isOpen
        searchTerm=""
        options={fromJS([])}
        selected={fromJS(selected)}

        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={H.VOID}
        toggleOpen={H.VOID}
        handleSearch={H.VOID}
        saveSearch={H.VOID}
        handleSelectedClick={handleSelectedClickStub}
        handleOptionClick={H.VOID}
      />,
    );

    const option = wrapper.find('.cookie-search__display-item').at(0);
    option.simulate('click');

    expect(handleSelectedClickStub.callCount).to.equal(1);
  });

  it('calls handleSearch when loadHeight is reached', () => {
    const handleSearchStub = stub();
    const wrapper = mount(
      <SelectSearchConnectedComponent
        id="categories"
        label=""
        prefix="cookie-search"
        placeholder=""

        isOpen
        searchTerm=""
        options={fromJS([])}
        selected={fromJS(selected)}

        addSelect={H.VOID}
        removeSelect={H.VOID}
        setSelected={H.VOID}
        toggleOpen={H.VOID}
        handleSearch={handleSearchStub}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}

        currentPage={2}
        totalPages={5}
        loading={false}
      />,
    );

    const scrollWrapper = wrapper.find('.cookie-search__open-wrapper');

    // loadHeight is (200 - 100) - 50 === 50
    // so when top of items exceeds 50, load more
    scrollWrapper.simulate('scroll', { target: {
      offsetHeight: 100, // height of scrollWrapper
      scrollHeight: 200, // height of all items
      scrollTop: 40, // height of all items ABOVE top of visible items (top of scrollWrapper)
    } });

    expect(handleSearchStub.callCount).to.equal(0);

    // scroll more
    scrollWrapper.simulate('scroll', { target: {
      offsetHeight: 100, // height of scrollWrapper
      scrollHeight: 200, // height of all items
      scrollTop: 60, // height of all items ABOVE top of visible items (top of scrollWrapper)
    } });
    expect(handleSearchStub.callCount).to.equal(1);
  });
});
