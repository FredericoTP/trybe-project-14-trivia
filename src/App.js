import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
