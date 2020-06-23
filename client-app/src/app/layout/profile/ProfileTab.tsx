import React from 'react'
import { Tab } from 'semantic-ui-react'
import ProfileAbout from './ProfileAbout'

const panes = [
    {
      menuItem: 'About',
      render: () => <ProfileAbout />,
    },
    {
      menuItem: 'Posts',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
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
