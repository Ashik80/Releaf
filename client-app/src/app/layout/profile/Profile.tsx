import React, { useContext, useEffect, Fragment } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../../stores/rootStore'
import { RouteComponentProps } from 'react-router-dom'
import LoadingComponent from '../../common/loader/LoadingComponent'
import { observer } from 'mobx-react-lite'
import ProfileCard from './ProfileCard'
import ProfileTab from './ProfileTab'

interface IProps {
    userName: string
}

const Profile: React.FC<RouteComponentProps<IProps>> = ({ match }) => {
    const rootStore = useContext(RootStoreContext)
    const { loadProfile, profile, loadingProfile } = rootStore.profileStore

    useEffect(() => {
        loadProfile(match.params.userName)
    }, [match.params.userName, loadProfile])

    return (
        <Grid>
            {loadingProfile && !profile ? (
                <Grid.Column width={16}>
                    <Segment style={{ height: 150 }}>
                        <LoadingComponent text="Loading Profile..." />
                    </Segment>
                </Grid.Column>
            ) : (
                <Fragment>
                    <Grid.Column width={5}>
                        <ProfileCard profile={profile} />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <ProfileTab />
                    </Grid.Column>
                </Fragment>
            )}
        </Grid>
    )
}

export default observer(Profile)
