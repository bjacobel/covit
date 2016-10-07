import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/main.css';
import { getCovDataAsync } from '../actions/covData';
import LeaderTable from './Table';
import Spinner from './Spinner';

const mapStateToProps = state => ({
  leaders: state.leaders,
  loading: state.loading,
});

const mapDispatchToProps = {
  getCovDataAsync,
};

// Separately export the MainComponent so it can be tested without being wrapped by connect()
export class MainComponent extends Component {
  componentWillMount() {
    this.props.getCovDataAsync();
  }

  render() {
    const { leaders, loading } = this.props;

    return (
      <div>
        <h1 className="title">
          <span className="red">Cov</span>
          <span className="gray">It</span>
          <span className="blue">!</span>
        </h1>
        <h3 className="sub title">The leaderboard for edX test coverage. Shoot for 100%!</h3>
        <LeaderTable leaders={ leaders } />
        <Spinner loading={ loading } />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
