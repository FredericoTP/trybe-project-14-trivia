import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.gravatarEmail,
  score: state.game.score,
});

export default connect(mapStateToProps)(Feedback);
