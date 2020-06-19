import React, { useContext, Fragment, useEffect } from 'react'
import { Segment, Container, Header, Icon, Button } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import LoginForm from '../forms/LoginForm'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import LoadingComponent from '../common/loader/LoadingComponent'

const LandingPage = () => {
    const rootStore = useContext(RootStoreContext)
    const { openModal } = rootStore.modalStore
    const { user, isLoggedIn, getUser, token, appLoaded, setAppLoaded } = rootStore.userStore

    useEffect(() => {
        if (token) getUser().then(() => setAppLoaded())
        else setAppLoaded()
    }, [getUser, token, setAppLoaded])

    if (!appLoaded) return <LoadingComponent text='Loading app...' />

    return (
        <Segment textAlign='center' inverted className='masthead' vertical>
            <Container>
                <Header inverted as='h1'>
                    Releaf
                    <Icon name='leaf' color='green' />
                </Header>
                {user && isLoggedIn ? (
                    <Fragment>
                        <Header inverted as='h2' content={`Welcome back ${user.displayName}`} style={{ marginBottom: 20 }} />
                        <Button as={Link} to='/feed' content='Go to your feed' size='huge' />
                    </Fragment>
                ) : (
                        <Fragment>
                            <Header inverted as='h2' content='Heal Yourself!' style={{ marginBottom: 20 }} />
                            <Button content='Login' size='huge' onClick={() => openModal(<LoginForm />)} />
                            <Button content='Register' size='huge' />
                        </Fragment>
                    )}
            </Container>
        </Segment>
    )
}

export default observer(LandingPage)
