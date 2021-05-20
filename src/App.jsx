import React, { useEffect } from 'react';
import LogIn from './components/LogIn';
import { useSelector } from 'react-redux';
import Dashboard from './components/Dashboard';
import PopupMessage from './components/PopupMessage';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Authentication from './modules/Authentication';
import SideMenu from './components/SideMenu';
import './App.css';
import Navbar from './components/Navbar';

document.body.style = 'background: #202020';

const App = () => {
  let location = useLocation();
  const { authenticated } = useSelector((state) => state);
  useEffect(() => {
    Authentication.validateToken();
  }, [authenticated]);

  return (
    <>
      {!authenticated && <Redirect to='/' />}
      {location.pathname !== '/' && (
        <>
          <SideMenu />
          <Navbar />
        </>
      )}
      <Switch>
        <Route exact path='/' component={LogIn}></Route>
        <Route exact path='/dashboard' component={Dashboard}></Route>
      </Switch>
      <PopupMessage />
    </>
  );
};

export default App;
