import React, { Component } from 'react';
import DataGrid from 'react-datagrid';
import sorty from 'sorty';
import Fuse from 'fuse.js';
import 'react-datagrid/index.css';

const columns = [
  {
    name: 'author',
    className: 'author',
    textAlign: 'left',
  },
  {
    name: 'avg',
    className: 'avg',
    textAlign: 'left',
  },
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
    for (let filter in this.state.filters) {
      let val = this.state.filters[filter];
      if (val !== '') {
        let fuse = new Fuse(arr, {keys: [filter]});
        return fuse.search(this.state.filters[filter]);
      }
    }
    return arr;
  }

  render() {
    let { leaders } = this.props;

    if (leaders.length > 0) {
      let filteredLeaders = this.filter(leaders);
      let sortedLeaders = this.sort(filteredLeaders);

      return (
        <DataGrid
          sortInfo={this.state.sortInfo}
          onSortChange={this.onSortChange}
          dataSource={sortedLeaders} idProperty="author" columns={columns}
          onFilter={this.onFilter}
          liveFilter={true}
        />
      );
    } else {
      return (<div></div>);
    }
  }
}
