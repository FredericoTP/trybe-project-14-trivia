import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';

export default class PlayerRank extends Component {
  constructor() {
    super();
    this.state = {
      hashEmail: '',
    };
  }

  componentDidMount() {
    const { player } = this.props;
    const hash = MD5(player.email).toString();

    this.setState({
      hashEmail: hash,
    });
  }

  render() {
    const { player, index } = this.props;
    const { name, score } = player;
    const { hashEmail } = this.state;

    return (
      <div>
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
        <img src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt={ name } />
      </div>
    );
  }
}

PlayerRank.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    email: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
