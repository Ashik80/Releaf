import React, { Fragment } from 'react'
import Navbar from './layout/Navbar'
import AppDashboard from './layout/AppDashboard'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import LandingPage from './layout/LandingPage'
import ModalContainer from './common/modals/ModalContainer'
import { ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react-lite'

const App = () => {
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
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

export default observer(App)
