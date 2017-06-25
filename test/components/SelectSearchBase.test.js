import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { sandbox, stub, spy } from 'sinon';
import { fromJS } from 'immutable';

import { optionsUI, selected } from '../fixtures/options';
import styles from '../fixtures/styles';
import H from '../helpers/index';

import { SelectSearchConnectedComponent } from '../../src/components/SelectSearchConnected';
import SelectSearchBase from '../../src/components/SelectSearchBase';

describe('<SelectSearchBase />', () => {
  beforeEach(() => {
    sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('renders', () => {
    const wrapper = shallow(
      <SelectSearchBase
        id="categories"
        prefix="cookie-search"
        label="Cookie Search"
        placeholder=""

        isOpen={false}
        searchTerm=""
        selected={fromJS([])}
        options={fromJS([])}

        toggleOpen={H.VOID}
        handleSearch={H.VOID}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}
      />,
    );

    expect(wrapper.find('.cookie-search__wrapper').length).to.equal(1);
  });

  it('handles search input', () => {
    const handleSearchStub = stub();
    const wrapper = shallow(
      <SelectSearchBase
        id="categories"
        prefix="cookie-search"
        label="Cookie Search"
        placeholder=""

        isOpen={false}
        searchTerm=""
        selected={fromJS([])}
        options={fromJS([])}

        toggleOpen={H.VOID}
        handleSearch={handleSearchStub}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}
      />,
    );

    const input = wrapper.find('.cookie-search__search-input');

    input.simulate('click', { target: { value: 'Chocolate' } });
    expect(handleSearchStub.callCount).to.equal(1);
    input.simulate('change', { target: { value: 'Strawberry' } });
    expect(handleSearchStub.callCount).to.equal(2);
  });

  it('renders option items', () => {
    const handleSearchStub = stub();
    const wrapper = shallow(
      <SelectSearchBase
        id="categories"
        prefix="cookie-search"
        label="Cookie Search"
        placeholder=""

        isOpen={false}
        searchTerm=""
        selected={fromJS([])}
        options={fromJS(optionsUI)}

        toggleOpen={H.VOID}
        handleSearch={handleSearchStub}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}
      />,
    );

    expect(wrapper.find('.cookie-search__open-wrapper').length).to.equal(0);
    wrapper.setProps({ isOpen: true });

    expect(wrapper.find('.cookie-search__open-wrapper').length).to.equal(1);
    expect(wrapper.find('.cookie-search__option-container').length).to.equal(4);
  });

  it('renders selected items', () => {
    const handleSearchStub = stub();
    const wrapper = shallow(
      <SelectSearchBase
        id="categories"
        prefix="cookie-search"
        label="Cookie Search"
        placeholder=""

        isOpen={false}
        searchTerm=""
        selected={fromJS(selected)}
        options={fromJS([])}

        toggleOpen={H.VOID}
        handleSearch={handleSearchStub}
        saveSearch={H.VOID}
        handleSelectedClick={H.VOID}
        handleOptionClick={H.VOID}
      />,
    );

    expect(wrapper.find('.cookie-search__display-container').length).to.equal(1);
    expect(wrapper.find('.cookie-search__display-item').length).to.equal(2);
  });
});
