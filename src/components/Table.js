import React, { Component } from 'react';
import DataGrid from 'react-datagrid';
import sorty from 'sorty';
import Fuse from 'fuse.js';
import 'react-datagrid/index.css';

const columns = [
  {
    name: 'username',
    className: 'username',
    textAlign: 'left'
  },
  {
    name: 'cloc',
    className: 'cloc',
    textAlign: 'left'
  }
];

export default class LeaderTable extends Component {
  constructor() {
    super();
    this.sort = this.sort.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.filter = this.filter.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  componentWillMount() {
    this.setState({sortInfo: [{name: 'username', dir: 'desc'}]});
    this.setState({filters: []});
  }

  sort(arr) {
    return sorty(this.state.sortInfo, arr);
  }

  onSortChange(info) {
    this.setState({sortInfo: info.pop()});
  }

  onFilter(column, value, allFilterValues) {
    this.setState({filters: allFilterValues});
  }

  filter(arr) {
    if ('username' in this.state.filters) {
      let fuse = new Fuse(arr, {keys: ['username']});
      return fuse.search(this.state.filters['username']);
    }
  }

  render() {
    let { leaders } = this.props;

    return (
      <DataGrid
        sortInfo={this.state.sortInfo}
        onSortChange={this.onSortChange}
        dataSource={this.sort(this.filter(leaders))} idProperty='username' columns={columns}
        onFilter={this.onFilter}
        liveFilter={true}
      />
    );
  }
}
