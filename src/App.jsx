import React from 'react';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import PopupMessage from './components/PopupMessage';
import { Switch, Route } from 'react-router';

document.body.style = 'background: #202020'

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LogIn}></Route>
        <Route exact path='/dashboard' component={Dashboard}></Route>
      </Switch>
      <PopupMessage />
    </>
  );
};

export default App;
