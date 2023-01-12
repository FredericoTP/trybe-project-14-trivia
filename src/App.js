import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Rankings from './pages/Rankings';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/rankings" component={ Rankings } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
