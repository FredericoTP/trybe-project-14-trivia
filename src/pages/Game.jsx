import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addQuestions } from '../redux/actions';
import Question from '../components/Question';

class Game extends Component {
  componentDidMount() {
    const { name, history } = this.props;
    const token = localStorage.getItem('token');

    if (name.length === 0 || token === '') {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.triviaApi();
  }

  triviaApi = async () => {
    const { dispatch, history } = this.props;
    const number3 = 3;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    if (data.response_code === number3) {
      localStorage.removeItem('token');
      history.push('/');
    }
    dispatch(addQuestions(data.results));
  };

  render() {
    const { questions, history } = this.props;
    return (
      <div>
        <Header />
        { questions.length > 0 && <Question history={ history } /> }
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Game);
