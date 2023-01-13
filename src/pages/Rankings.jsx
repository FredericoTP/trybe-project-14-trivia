import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerRank from '../components/PlayerRank';

export default class Rankings extends Component {
  render() {
    let players = JSON.parse(localStorage.getItem('ranking'));
    if (players !== null) {
      players = players.sort((a, b) => b.score - a.score);
    }
    return (
      <div>
        <button
          type="button"
          data-testid="btn-go-home"
        >
          <Link to="/">
            Pagina Inicial
          </Link>
        </button>
        <div>
          { players ? (players.map((player, index) => (<PlayerRank
            key={ index }
            player={ player }
            index={ index }
          />))) : (<h3>Ninguem jogou ainda</h3>)}
        </div>
      </div>
    );
  }
}
