import React, { Fragment } from 'react'
import Navbar from './layout/Navbar'
import AppDashboard from './layout/AppDashboard'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import LandingPage from './layout/LandingPage'
import ModalContainer from './common/modals/ModalContainer'

const App = () => {
  return (
    <Fragment>
      <ModalContainer />
      <Route exact path={'/'} component={LandingPage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <Navbar />
          <Container>
            <Route path='/feed' component={AppDashboard} />
          </Container>
        </Fragment>
      )} />
    </Fragment>
  )
}

export default App
