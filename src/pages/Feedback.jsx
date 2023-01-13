import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;

    history.push('/');
  };

  redirectToRanking = () => {
    const { history } = this.props;

    history.push('/rankings');
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
}.isRequired;

const mapStateToProps = (globalState) => ({
  score: globalState.game.score,
  assertions: globalState.game.assertions,
});

export default connect(mapStateToProps)(Feedback);
