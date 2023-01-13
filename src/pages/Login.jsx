import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { addPersonInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    inputName: '',
    inputEmail: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  isButtonDisabled = () => {
    const { inputName, inputEmail } = this.state;
    const number = 0;
    const validatePassword = inputName.length > number;
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !(validatePassword && validEmail.test(inputEmail));
  };

  handleSubmit = async (event) => {
    const { history, dispatch } = this.props;
    const { inputName, inputEmail } = this.state;
    event.preventDefault();

    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();

    localStorage.setItem('token', data.token);

    history.push('/game');

    dispatch(addPersonInfo(inputName, inputEmail));
  };

  handleConfig = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { inputName, inputEmail } = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
          </header>
        </div>
        <input
          type="text"
          name="inputName"
          data-testid="input-player-name"
          value={ inputName }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="inputEmail"
          data-testid="input-gravatar-email"
          value={ inputEmail }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.isButtonDisabled() }
          onClick={ this.handleSubmit }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfig }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
