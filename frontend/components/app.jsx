import React from 'react'
import { Route } from 'react-router-dom'
import GreetingContainer from './greeting/greeting_container' 
import LoginFormContainer from './session_form/login_form_container'
import SignupFormContainer from './session_form/login_form_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util'


const App = () => (
  <>
    <header>
      <h1>Pheedly</h1>
      <GreetingContainer />
    </header>
    <AuthRoute exact path='/login' component={LoginFormContainer} />
    <AuthRoute exact path='/signup' component={SignupFormContainer} />
  </>
)

export default App;