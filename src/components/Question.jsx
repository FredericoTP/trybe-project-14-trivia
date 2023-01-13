import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Question.css';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: false,
      array: [],
    };
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.setState({
      isDisabled: true,
    });
  }

  render() {
    const { isDisabled, array } = this.state;
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
                    onClick={ this.handleClick }
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
                  onClick={ this.handleClick }
                >
                  { item }
                </button>
              );
            })
          }
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
};

const mapStateToProps = (state) => ({
  questionIndex: state.game.questionIndex,
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Question);
