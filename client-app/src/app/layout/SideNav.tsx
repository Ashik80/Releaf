import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'

const SideNav = () => {
    return (
        <Segment>
            <Menu secondary vertical fluid>
                <Menu.Item
                    name='Home'
                    active
                />
                <Menu.Item
                    name='Profile'
                />
                <Menu.Item
                    name='Pages'
                />
            </Menu>
        </Segment>
    )
}

export default SideNav
