import React from 'react'
import { Route, Switch } from "react-router-dom";
import ResidentHome from './containers/Resident/Home'
import NotFound from './containers/NotFound';
import ResidentLogin from './containers/Resident/Login';
import AppliedRoute from './components/AppliedRoute'
import ResidentUserInfo from './containers/Resident/User/Info'

const Routes = ({ childProps }) => {
  return (
    <Switch>
      <AppliedRoute exact path='/' component={ResidentHome} props={childProps} />
      <AppliedRoute path='/login' component={ResidentLogin} props={childProps} />
      <AppliedRoute path='/resident' component={ResidentUserInfo} props={childProps} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes
