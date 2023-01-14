import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    if (!localStorage.getItem('players')) {
      const array = [this.playerInfos()];
      localStorage.setItem('players', [JSON.stringify(array)]);
      this.playerInfos();
    } else {
      const arrayPlayers = JSON.parse(localStorage.getItem('players'));
      const storage = [...arrayPlayers, this.playerInfos()];
      localStorage.setItem('players', JSON.stringify(storage));
    }
  }

  playAgain = () => {
    const { history } = this.props;

    history.push('/');
  };

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/rankings');
  };

  playerInfos = () => {
    const { name, email, score } = this.props;
    const playerInfo = { name, email, score };
    return playerInfo;
  };

  render() {
    const { assertions, score } = this.props;

    const minLength = 3;
    return (
      <div>
        <Header />
        <div>
          { (assertions < minLength
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>)}
        </div>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  score: globalState.player.score,
  assertions: globalState.player.assertions,
  name: globalState.login.name,
  email: globalState.login.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
