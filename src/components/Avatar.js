import React, { Component } from 'react';
import '../stylesheets/avatars.css';

export default class Avatar extends Component {
  componentWillMount() {
    let { username } = this.props;

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('probably rate limited');
        }
      })
      .then((json) => {
        this.setState({avatarUrl: json['avatar_url'] + '&size=32'});
      })
      .catch(err => console.error(err));
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    let { username } = this.props;
    let avatarUrl;

    if (this.state && this.state.avatarUrl) {
      avatarUrl = this.state.avatarUrl;
    } else {
      avatarUrl = `https://api.adorable.io/avatars/40/${username}.png`;
    }

    return <div
      className="img"
      style={ {
        backgroundImage: `url('${avatarUrl}')`,
      } }
    />;
  }
}
