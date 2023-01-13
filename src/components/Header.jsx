import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

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
      <div>
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2>
          Pontuação:
          {' '}
          <span data-testid="header-score">{ score }</span>
        </h2>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="profile"
        />
      </div>
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
