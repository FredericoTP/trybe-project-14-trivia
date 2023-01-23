import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import '../style/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      hashEmail: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const hash = MD5(email).toString();

    this.setState({
      hashEmail: hash,
    });
  }

  render() {
    const { hashEmail } = this.state;
    const { name, score } = this.props;
    return (
      <header className="header-container">
        <div className="header-player-content">
          <h2 className="header-name" data-testid="header-player-name">{ name }</h2>
          <img
            className="header-img"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="profile"
          />
        </div>
        <div className="header-score-content">
          <h2 className="header-score">
            Score:
            {' '}
            <span data-testid="header-score">{ score }</span>
          </h2>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
