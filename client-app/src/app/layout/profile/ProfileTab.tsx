import React from 'react'
import { Tab } from 'semantic-ui-react'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'

const panes = [
    {
      menuItem: 'About',
      render: () => <ProfileAbout />,
    },
    {
      menuItem: 'Posts',
      render: () => <ProfilePosts />,
    }
]

const ProfileTab = () => {
    return (
        <Tab
            menu={{ attached: false, tabular: false, style: {width: 'fit-content'} }}
            panes={panes}
        />
    )
}

export default ProfileTab
