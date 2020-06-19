import React, { Fragment, useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import NewsFeed from './NewsFeed'
import { observer } from 'mobx-react-lite'
import CreatePost from '../forms/CreatePost'
import { RootStoreContext } from '../../stores/rootStore'
import { history } from '../..'

const AppDashboard = () => {
    const rootStore = useContext(RootStoreContext)
    const {isLoggedIn} = rootStore.userStore

    if(!isLoggedIn) history.push('/')

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

export default observer(AppDashboard)
