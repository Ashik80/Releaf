import React from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' style={{marginBottom: 30}} />
                We're sorry! The item you requested cannot be found
            </Header>
            <Button as={Link} to='/feed' color='teal' content='Go back to your feed' />
        </Segment>
    )
}

export default NotFound
