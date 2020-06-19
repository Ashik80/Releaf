import React, { useContext, Fragment } from 'react'
import { Menu, Container, Header, Icon, Segment, Image, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite'

const Navbar = () => {
    const rootStore = useContext(RootStoreContext)
    const { logout, user, isLoggedIn } = rootStore.userStore

    return (
        <Segment inverted style={{ padding: 0, marginTop: 0 }}>
            <Menu inverted secondary>
                <Container>
                    <Menu.Item as={Link} to='/'>
                        <Header as='h3' style={{ color: 'white', marginTop: 2 }}>
                            Releaf
                            <Icon name='leaf' color='green' />
                        </Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        {user && isLoggedIn && (
                            <Fragment>
                            <Menu.Item
                                as={Link}
                                to='/feed'
                                name='Home'
                            />
                            <Menu.Item
                                name='Profile'
                            />
                            <Menu.Item>
                                <Image size='mini' src='/Images/user.png' circular style={{ marginRight: 5 }} />
                                <Dropdown pointing text={user?.displayName}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='setting' text='Settings' />
                                        <Dropdown.Item icon='power' text='Logout' onClick={logout} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                            </Fragment>
                        )}
                    </Menu.Menu>
                </Container>
            </Menu>
        </Segment>
    )
}

export default observer(Navbar)
