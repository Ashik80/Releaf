import React, { Fragment, useContext, useEffect } from 'react'
import Navbar from './layout/Navbar'
import AppDashboard from './layout/AppDashboard'
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './layout/LandingPage'
import ModalContainer from './common/modals/ModalContainer'
import { ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../stores/rootStore'
import LoadingComponent from './common/loader/LoadingComponent'
import NotFound from './errors/NotFound'
import Profile from './layout/profile/Profile'

const App = () => {
  const rootStore = useContext(RootStoreContext)
  const { getUser, token, appLoaded, setAppLoaded } = rootStore.userStore

  useEffect(() => {
    if (token) getUser().finally(() => setAppLoaded())
    else setAppLoaded()
  }, [getUser, token, setAppLoaded])

  if (!appLoaded) return <LoadingComponent text='Loading app...' />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path={'/'} component={LandingPage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <Navbar />
          <Container style={{marginTop: 80}}>
            <Switch>
              <Route exact path='/feed' component={AppDashboard} />
              <Route path='/profile/:userName' component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Fragment>
      )} />
    </Fragment>
  )
}

export default observer(App)
