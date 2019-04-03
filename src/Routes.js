import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home'
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import AppliedRoute from './components/AppliedRoute'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'
import ResidentUserInfo from './containers/User/Info'
import ChangePassword from './containers/User/ChangePassword';
import InitialPasswordSetup from './containers/User/InitialPasswordSetup';

const Routes = ({ childProps }) => {
  return (
    <Switch>
      <AuthenticatedRoute exact path='/' component={Home} props={childProps} />
      <UnauthenticatedRoute path='/login' component={Login} props={childProps} />
      <AuthenticatedRoute exact path='/resident' component={ResidentUserInfo} props={childProps} />
      <AuthenticatedRoute path='/resident/change-password' component={ChangePassword} props={childProps} />
      <AppliedRoute path='/resident/initial-password-setup' component={InitialPasswordSetup} props={childProps} />
      <AuthenticatedRoute path='/contactus' component={ContactUs} props={childProps} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes
