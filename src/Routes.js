import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home'
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import AppliedRoute from './components/AppliedRoute'
import ResidentUserInfo from './containers/User/Info'

const Routes = ({ childProps }) => {
  return (
    <Switch>
      <AppliedRoute exact path='/' component={Home} props={childProps} />
      <AppliedRoute path='/login' component={Login} props={childProps} />
      <AppliedRoute path='/resident' component={ResidentUserInfo} props={childProps} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes
