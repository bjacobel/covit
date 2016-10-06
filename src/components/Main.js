import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/main.css';
import { getCovDataAsync } from '../actions/covData';

const mapStateToProps = state => ({
  leaders: state.leaders,
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
    const { leaders } = this.props;

    return (
      <pre>{ JSON.stringify(leaders, null, 2) }</pre>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
