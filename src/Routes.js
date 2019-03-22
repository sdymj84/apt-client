import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home'
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import AppliedRoute from './components/AppliedRoute'
import ResidentUserInfo from './containers/User/Info'
import ChangePassword from './containers/User/ChangePassword';
import InitialPasswordSetup from './containers/User/InitialPasswordSetup';

const Routes = ({ childProps }) => {
  return (
    <Switch>
      <AppliedRoute exact path='/' component={Home} props={childProps} />
      <AppliedRoute path='/login' component={Login} props={childProps} />
      <AppliedRoute exact path='/resident' component={ResidentUserInfo} props={childProps} />
      <AppliedRoute path='/resident/change-password' component={ChangePassword} props={childProps} />
      <AppliedRoute path='/resident/initial-password-setup' component={InitialPasswordSetup} props={childProps} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes
