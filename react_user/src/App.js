import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/admin/dashboard/dashboard';
import Profile from './components/admin/profile/profile';

/**
 * This class only matches the url and renders the appropriate component for the url 
 */

function App() {
    return (
      <Router>
        <Switch>
          <UnPrivateRoute exact path='/login' component={Login} />
          <UnPrivateRoute exact path='/register' component={Register} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <Route exact path='/' component={Dashboard}/>
          {/* <PrivateRoute exact path='/admin/surveys/senior/edit' name="Senior" component={SurveyLayoutEdit} /> */}
          {/* <Route exact path='/admin/surveys/senior/url/:id' render={(props) => <SurveyView {...props} name="Senior"/> } /> */}
          <Route path='/'>
            <Redirect to="/" />
          </Route>
        </Switch>
        <br />
      </Router>
    );
}

export default App;
