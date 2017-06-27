// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapWithClickout from 'react-clickout';

import SelectSearchBase from './SelectSearchBase';
import {
  addSelect,
  toggleOpen,
  setSelected,
  saveSearch,
  removeSelect,
} from '../redux/actions';

import type { Options, Selected, Callback } from '../types';

type SelectSearchConnectedProps = {
  // config
  id: string,

  // appearance
  label: string,
  prefix: string,
  placeholder: string,

  // data
  isOpen: boolean,
  searchTerm: string,
  options: Options,
  selected: Selected,
  totalPages: number,
  currentPage: number,
  loading: boolean,

  // connected methods
  addSelect: Callback,
  removeSelect: Callback,
  setSelected: Callback,

  toggleOpen: Callback,
  handleSearch: Callback,
  saveSearch: Callback,
  handleSelectedClick: Callback,
  handleOptionClick: Callback,
};

type SelectSearchConnectedDefaultProps = {
  // appearance
  label: '',
  placeholder: '',
  prefix: 'rsm',

  // data
  isOpen: false,
  searchTerm: '',
};

export class SelectSearchConnectedComponent extends Component {
  defaultProps: SelectSearchConnectedDefaultProps;
  props: SelectSearchConnectedProps;

  componentDidMount() {
    const { id } = this.props;
    this.props.addSelect({ id });
  }

  componentWillUnmount() {
    const { id } = this.props;
    this.props.removeSelect({ id });
  }

  handleOptionClick = (option: Object) => () => {
    this.props.handleOptionClick({ selectId: this.props.id, option });
  }

  handleSelectedClick = (selected: Object) => () => {
    this.props.handleSelectedClick({ selectId: this.props.id, selected });
  }

  handleClickout = () => {
    if (!this.props.isOpen) return;
    this.props.toggleOpen({ id: this.props.id, isOpen: false });
  }

  handleSearch = (searchTerm: string) => {
    if (!this.props.isOpen) {
      this.props.toggleOpen({ id: this.props.id, isOpen: true });
    }
    this.props.saveSearch({ id: this.props.id, searchTerm });
    this.props.handleSearch({ search: searchTerm });
  }

  handleScroll = (e: Object) => {
    const { scrollTop, offsetHeight, scrollHeight } = e.target;
    const { currentPage, totalPages, loading } = this.props;
    const nextPage = Number(currentPage) + 1;
    const loadHeight = (scrollHeight - offsetHeight) - 50;
    if (Math.floor(scrollTop) >= (loadHeight)
      && nextPage <= totalPages && !loading) {
      this.props.handleSearch({
        search: this.props.searchTerm,
        pageNo: nextPage,
      });
    }
  }

  render() {
    return (
      <SelectSearchBase
        id={this.props.id}
        label={this.props.label}
        prefix={this.props.prefix}
        placeholder={this.props.placeholder}
        options={this.props.options}
        selected={this.props.selected}
        searchTerm={this.props.searchTerm}
        isOpen={this.props.isOpen}
        handleOptionClick={this.handleOptionClick}
        handleSelectedClick={this.handleSelectedClick}
        handleSearch={this.handleSearch}
        handleScroll={this.handleScroll}
      />);
  }
}

const mapStateToProps = (state, ownProps) => ({
  isOpen: state.select.getIn([ownProps.id, 'isOpen']),
  selected: state.select.getIn([ownProps.id, 'selected']),
  options: state.select.getIn([ownProps.id, 'options']),
  searchTerm: state.select.getIn([ownProps.id, 'searchTerm']),
});

const mapDispatchToProps = {
  addSelect,
  toggleOpen,
  setSelected,
  saveSearch,
  removeSelect,
};

const Wrapped = wrapWithClickout(SelectSearchConnectedComponent);

const connected = connect(mapStateToProps, mapDispatchToProps)(Wrapped);

export default connected;
