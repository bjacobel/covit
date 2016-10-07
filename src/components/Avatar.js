import React, { Component } from 'react';
import '../stylesheets/avatars.css';

export default class Avatar extends Component {

  componentWillMount() {
    this.state = {avatarUrl: 'http://placehold.it/32x32'};
  }

  componentDidMount() {
    let { username } = this.props;

    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(json => {
        this.setState({avatarUrl: json['avatar_url'] + '&size=32'});
      });
  }

  render() {
    let { username } = this.props;
    let { avatarUrl } = this.state;

    return (
      <img
        alt={username}
        src={avatarUrl}
      />
    );
  }
}
