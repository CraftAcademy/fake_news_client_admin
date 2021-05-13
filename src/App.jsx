import React from 'react'
import LogInLandingpage from './components/LogInLandingpage'
import Dashboard from './components/Dashboard';
import PopupMessage from './components/PopupMessage'
import { Switch, Route } from 'react-router';

const App = () => {
  return (
    <>
    <Switch>
      <Route exact path="/" component={LogInLandingpage}></Route>
      <Route exact path="/dashboard" component={Dashboard}></Route>
    </Switch>
    <PopupMessage/>
    </>
  );
};

export default App;
