import React, { useEffect } from 'react';
import LogIn from './components/LogIn';
import { useSelector } from 'react-redux';
import Dashboard from './components/Dashboard';
import PopupMessage from './components/PopupMessage';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Authentication from './modules/Authentication';
import SideMenu from './components/SideMenu';
import AdminDashboard from './components/editor/AdminDashboard';
import './App.css';
import Navbar from './components/Navbar';
import EditorialForm from './components/editor/EditorialForm';
import EditorOverview from './components/editor/EditorOverview';

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
        <Route exact path='/overview' component={EditorOverview}></Route>
        <Route exact path='/admin-dashboard' component={AdminDashboard}></Route>
        <Route exact path='/create'>
          <EditorialForm isCreateMode={true} />
        </Route>
        <Route exact path='/edit' component={EditorialForm} />
      </Switch>
      <PopupMessage />
    </>
  );
};

export default App;
