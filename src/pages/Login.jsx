import React from 'react';
import logo from '../trivia.png';

export default class Login extends React.Component {
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
        >
          Play
        </button>
      </div>
    );
  }
}
