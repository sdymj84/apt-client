import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFound from './containers/NotFound';
import AppliedRoute from './components/AppliedRoute'
import ManagerHome from './containers/Manager/Home';
import ManagerLogin from './containers/Manager/Login';

const ManagerRoutes = ({ childProps }) => {
  return (
    <Switch>
      <AppliedRoute exact path='/manager' component={ManagerHome} props={childProps} />
      <AppliedRoute path='/manager/login' component={ManagerLogin} props={childProps} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default ManagerRoutes
