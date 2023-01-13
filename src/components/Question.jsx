import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Question.css';
import { nextQuestion } from '../redux/actions';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: false,
      array: [],
      showNext: false,
    };
    this.handleClickIncorrect = this.handleClickIncorrect.bind(this);
    this.handleClickCorrect = this.handleClickCorrect.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const number = 0.5;
    const { questions, questionIndex } = this.props;
    const {
      correct_answer: correct, incorrect_answers: incorrect,
    } = questions[questionIndex];
    let answers = [];
    answers = [correct, ...incorrect];
    this.setState({
      array: answers.sort(() => Math.random() - number),
    });
  }

  handleClickIncorrect() {
    this.setState({
      isDisabled: true,
      showNext: true,
    });
  }

  handleClickCorrect() {
    this.setState({
      isDisabled: true,
      showNext: true,
    });
    console.log('a');
  }

  handleNext() {
    const { questions, questionIndex, dispatch, history } = this.props;
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
      });
    }
  }

  render() {
    const { isDisabled, array, showNext } = this.state;
    const { questions, questionIndex } = this.props;
    let index = 0;
    return (
      <div>
        <p data-testid="question-category">{ questions[questionIndex].category }</p>
        <p data-testid="question-text">{ questions[questionIndex].question }</p>
        <div data-testid="answer-options">
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
                    disabled={ isDisabled }
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
                  disabled={ isDisabled }
                  onClick={ this.handleClickCorrect }
                >
                  { item }
                </button>
              );
            })
          }
        </div>
        <div>
          { showNext && (
            <button
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
};

const mapStateToProps = (state) => ({
  questionIndex: state.game.questionIndex,
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Question);
