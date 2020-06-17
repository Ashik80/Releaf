import React from 'react'
import { Menu, Container, Header, Icon, Segment, Image, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <Segment inverted style={{ padding: 0 }}>
            <Menu inverted secondary>
                <Container>
                    <Menu.Item as={Link} to='/'>
                        <Header as='h3' style={{color: 'white', marginTop: 2}}>
                            Releaf
                            <Icon name='leaf' color='green' />
                        </Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Image size='mini' src='/Images/user.png' circular style={{marginRight: 5}}/>
                            <Dropdown pointing text="Ashik">
                                <Dropdown.Menu>
                                    <Dropdown.Item icon='setting' text='Settings' />
                                    <Dropdown.Item icon='power' text='Logout' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        </Segment>
    )
}

export default Navbar
