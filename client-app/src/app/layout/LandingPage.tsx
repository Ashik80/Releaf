import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Container, Header, Icon, Button } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import LoginForm from '../forms/LoginForm'

const LandingPage = () => {
    const rootStore = useContext(RootStoreContext)
    const {openModal} = rootStore.modalStore

    return (
        <Segment textAlign='center' inverted className='masthead' vertical>
            <Container>
                <Header inverted as='h1'>
                    Releaf
                    <Icon name='leaf' color='green' />
                </Header>
                <Header inverted as='h2' content='Heal Yourself!' style={{marginBottom: 20}} />
                <Button content='Login' size='huge' onClick={() => openModal(<LoginForm />)} />
                <Button content='Register' size='huge' />
            </Container>
        </Segment>
    )
}

export default LandingPage
