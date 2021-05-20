import React, { useEffect } from 'react';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import PopupMessage from './components/PopupMessage';
import { Switch, Route } from 'react-router';
import Authentication from './modules/Authentication';
import './App.css';
import Navbar from './components/Navbar';

document.body.style = 'background: #202020';

const App = () => {
  useEffect(() => {
    Authentication.validateToken();
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={LogIn}></Route>
        <Route exact path='/dashboard' component={Dashboard}></Route>
      </Switch>
      <PopupMessage />
    </>
  );
};

export default App;
