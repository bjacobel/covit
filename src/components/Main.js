import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/main.css';
import { getLeadersAsync } from '../actions/leaders';

const mapStateToProps = state => ({
  title: state.title,
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
    const { title } = this.props;

    return (
      <h1 className="title">{ title.error || title.content }</h1>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
