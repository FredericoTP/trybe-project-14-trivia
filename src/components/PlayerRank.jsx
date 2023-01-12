import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PlayerRank extends Component {
  render() {
    const { player, index } = this.props;
    const { name, score, picture } = player;
    return (
      <div>
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
        <img src={ picture } alt={ name } />
      </div>
    );
  }
}

PlayerRank.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    picture: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
