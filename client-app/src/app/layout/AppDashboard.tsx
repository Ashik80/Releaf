import React, { Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import NewsFeed from './NewsFeed'
import CreatePost from '../forms/CreatePost'

const AppDashboard = () => {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={11}>
                    <NewsFeed />
                </Grid.Column>
                <Grid.Column width={5}>
                    <CreatePost />
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}

export default AppDashboard
