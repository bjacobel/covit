import React, { Component } from 'react';
import '../stylesheets/spinner.css';

export default class Spinner extends Component {
  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <div className="spinner-bg">
          <div className="spinner" />
        </div>
      );
    } else {
      return null;
    }
  }
}

