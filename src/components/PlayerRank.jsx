import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import '../style/PlayerRank.css';

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
      <div className="playerrank-container">
        <div className="playerrank-content">
          <img data-testid="player-image" src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt={ name } />
          <p data-testid={ `player-name-${index}` }>{name}</p>
        </div>
        <p
          className="playerrank-score"
          data-testid={ `player-score-${index}` }
        >
          {score}
        </p>
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
