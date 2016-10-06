import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/main.css';
import { getLeadersAsync } from '../actions/leaders';
import LeaderTable from './Table';

const mapStateToProps = state => ({
  leaders: state.leaders,
});

const mapDispatchToProps = {
  getLeadersAsync,
};

// Separately export the MainComponent so it can be tested without being wrapped by connect()
export class MainComponent extends Component {
  componentWillMount() {
    this.props.getLeadersAsync();
  }

  render() {
    const { leaders } = this.props;

    return (
      <div>
        <h1 className="title">Leaders</h1>
        <LeaderTable leaders={ leaders } />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
