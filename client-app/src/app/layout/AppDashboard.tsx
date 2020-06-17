import React, { Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import SideNav from './SideNav'
import NewsFeed from './NewsFeed'

const AppDashboard = () => {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={11}>
                    <NewsFeed />
                </Grid.Column>
                <Grid.Column width={5}>
                    <SideNav />
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}

export default AppDashboard
