import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/main.css';
import { getLeadersAsync } from '../actions/leaders';
import { setupFirebase } from '../actions/firebase';

const mapStateToProps = state => ({
  leaders: state.leaders,
});

const mapDispatchToProps = {
  getLeadersAsync,
  setupFirebase,
};

// Separately export the MainComponent so it can be tested without being wrapped by connect()
export class MainComponent extends Component {
  componentWillMount() {
    this.props.getLeadersAsync();
    this.props.setupFirebase();
  }

  render() {
    const { leaders } = this.props;

    return (
      <h1 className="title">{ JSON.stringify(leaders) }</h1>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
