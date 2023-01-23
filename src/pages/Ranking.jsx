import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerRank from '../components/PlayerRank';
import '../style/Ranking.css';

export default class Ranking extends Component {
  render() {
    let players = JSON.parse(localStorage.getItem('players'));
    if (players !== null) {
      players = players.sort((a, b) => b.score - a.score);
    }
    return (
      <div className="ranking-container">
        <div className="ranking-content">
          <h2
            className="ranking-title"
            data-testid="ranking-title"
          >
            Ranking
          </h2>
          <Link
            className="btn btn-dark btn-ranking"
            data-testid="btn-go-home"
            to="/"
          >
            Pagina Inicial
          </Link>
          <div className="ranking-players">
            { players ? (players.map((player, index) => (<PlayerRank
              key={ index }
              player={ player }
              index={ index }
            />))) : (<h3>Ninguem jogou ainda</h3>)}
          </div>
        </div>
      </div>
    );
  }
}
