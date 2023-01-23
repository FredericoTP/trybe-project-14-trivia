import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../style/Feedback.css';
import imageOne from '../images/peeposad.jpg';
import imageTwo from '../images/peepohappy.jpg';

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
    history.push('/ranking');
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
      <div className="feedback-container">
        <Header />
        <div className="feedback-content">
          { (assertions < minLength
            ? (
              <div>
                <img className="feedback-img" src={ imageOne } alt="" />
                <p data-testid="feedback-text">Could be better...</p>
              </div>
            )
            : (
              <div>
                <img className="feedback-img" src={ imageTwo } alt="" />
                <p data-testid="feedback-text">Well Done!</p>
              </div>
            )
          )}
          <div data-testid="feedback-total-score">
            <h4>
              Score:
              {' '}
              {score}
            </h4>
          </div>
          <div data-testid="feedback-total-question">
            <h4>
              Assertions:
              {' '}
              {assertions}
            </h4>
          </div>
          <button
            className="btn btn-dark btn-feedback"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Play Again
          </button>
          <button
            className="btn btn-dark btn-feedback"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.redirectToRanking }
          >
            Ranking
          </button>
        </div>
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
