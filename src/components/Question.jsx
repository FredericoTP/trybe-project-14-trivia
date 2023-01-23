import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Question.css';
import { nextQuestion, handleScore, handleAssertions } from '../redux/actions';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: false,
      array: [],
      showNext: false,
      timer: 30,
    };
    this.handleClickIncorrect = this.handleClickIncorrect.bind(this);
    this.handleClickCorrect = this.handleClickCorrect.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.sumScore = this.sumScore.bind(this);
  }

  componentDidMount() {
    const number = 0.5;
    const number1000 = 1000;
    const { questions, questionIndex } = this.props;
    const {
      correct_answer: correct, incorrect_answers: incorrect,
    } = questions[questionIndex];
    let answers = [];
    answers = [correct, ...incorrect];
    this.setState({
      array: answers.sort(() => Math.random() - number),
    });

    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, number1000);
  }

  componentDidUpdate() {
    const { timer } = this.state;

    if (timer === 0) {
      clearInterval(this.intervalId);
      clearInterval(this.intervalIdTwo);
    }
  }

  handleClickIncorrect() {
    this.setState({
      isDisabled: true,
      showNext: true,
    });
    clearInterval(this.intervalId);
    clearInterval(this.intervalIdTwo);
  }

  handleClickCorrect() {
    const { dispatch } = this.props;
    this.setState({
      isDisabled: true,
      showNext: true,
    });
    clearInterval(this.intervalId);
    clearInterval(this.intervalIdTwo);
    dispatch(handleScore(this.sumScore()));
    dispatch(handleAssertions());
  }

  handleNext() {
    const { questions, questionIndex, dispatch, history } = this.props;
    const number1000 = 1000;
    if (questionIndex + 1 === questions.length) {
      history.push('/feedback');
    } else {
      dispatch(nextQuestion());
      const number = 0.5;
      const {
        correct_answer: correct, incorrect_answers: incorrect,
      } = questions[questionIndex + 1];
      let answers = [];
      answers = [correct, ...incorrect];
      this.setState({
        array: answers.sort(() => Math.random() - number),
        isDisabled: false,
        showNext: false,
        timer: 30,
      });

      this.intervalIdTwo = setInterval(() => {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      }, number1000);
    }
  }

  sumScore() {
    const { score, questions, questionIndex } = this.props;
    const { timer } = this.state;
    const { difficulty } = questions[questionIndex];
    const dif = difficulty;
    const number10 = 10;
    const number3 = 3;

    switch (dif) {
    case 'hard':
      return (score + (number10 + timer * number3));
    case 'medium':
      return (score + (number10 + timer * 2));
    default:
      return (score + (number10 + timer * 1));
    }
  }

  render() {
    const { isDisabled, array, showNext, timer } = this.state;
    const { questions, questionIndex } = this.props;
    let index = 0;
    this.sumScore();
    return (
      <div className="question-container">
        <div className="question-info">
          <p
            className="question-category"
            data-testid="question-category"
          >
            { questions[questionIndex].category }
          </p>
          <p data-testid="question-text">{ questions[questionIndex].question }</p>
          <h4 className="timer" data-testid="timer-text">{ `Time: ${timer}` }</h4>
        </div>
        <div className="answer-options" data-testid="answer-options">
          {
            array.map((item) => {
              if (item !== questions[questionIndex].correct_answer) {
                index += 1;
                return (
                  <button
                    className="btn-incorrect"
                    key={ item }
                    type="button"
                    data-testid={ `wrong-answer-${index - 1}` }
                    disabled={ (isDisabled || timer === 0) }
                    onClick={ this.handleClickIncorrect }
                  >
                    { item }
                  </button>
                );
              }

              return (
                <button
                  className="btn-correct"
                  key={ item }
                  type="button"
                  data-testid="correct-answer"
                  disabled={ isDisabled || timer === 0 }
                  onClick={ this.handleClickCorrect }
                >
                  { item }
                </button>
              );
            })
          }
          { (showNext || timer === 0) && (
            <button
              className="btn btn-dark btn-next"
              data-testid="btn-next"
              type="button"
              onClick={ this.handleNext }
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questionIndex: state.player.questionIndex,
  questions: state.player.questions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Question);
