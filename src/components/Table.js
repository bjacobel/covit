import React, { Component } from 'react';
import DataGrid from 'react-datagrid';
import sorty from 'sorty';
import Fuse from 'fuse.js';
import Avatar from './Avatar.js'
import 'react-datagrid/index.css';
import '../stylesheets/table.css';


const columns = [
  {
    name: 'avatar',
    className: 'avatar',
    type: 'image',
    textAlign: 'left',
    width: 40,
    title: ' ',
    render: (_, row) => {
      return (
        <Avatar username={row.author} />
      );
    }
  },
  {
    name: 'author',
    title: 'Contributor',
    className: 'author',
    type: 'string',
    textAlign: 'left',
    render: (v) => {
      return (<a href={`https://github.com/${v}`}>{v}</a>)
    }
  },
  {
    name: 'avg',
    title: 'Average % PR Coverage',
    className: 'avg',
    type: 'number',
    textAlign: 'right',
    render: (v) => Number(v).toFixed(3) + '%',
  },
  {
    name: 'count',
    title: 'Number of PRs',
    className: 'count',
    type: 'number',
    textAlign: 'right',
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
    this.setState({sortInfo: [{name: 'avg', dir: -1, type: 'number'}]});
    this.setState({filters: []});
  }

  sort(arr) {
    return sorty(this.state.sortInfo, arr);
  }

  onSortChange(info) {
    for (let i = 0, len = info.length; i < len; i++) {
      let column = columns.filter((col) => col.name === info[i].name)[0];
      info[i].type = column.type;
    }
    this.setState({sortInfo: info});
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
