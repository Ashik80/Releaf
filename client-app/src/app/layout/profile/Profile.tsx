import React, { useContext, useEffect, Fragment, useState } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../../stores/rootStore'
import { RouteComponentProps } from 'react-router-dom'
import LoadingComponent from '../../common/loader/LoadingComponent'
import { observer } from 'mobx-react-lite'
import ProfileCard from './ProfileCard'
import ProfileTab from './ProfileTab'
import PhotoUpload from '../photoUpload/PhotoUpload'

interface IProps {
    userName: string
}

const Profile: React.FC<RouteComponentProps<IProps>> = ({ match }) => {
    const rootStore = useContext(RootStoreContext)
    const { 
        loadProfile, 
        profile, 
        loadingProfile, 
        uploadPhoto, 
        uploading, 
        isCurrentUser,
        deletePhoto,
        deleting 
    } = rootStore.profileStore
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        loadProfile(match.params.userName)
    }, [match.params.userName, loadProfile])

    return (
        <Grid>
            {loadingProfile ? (
                <Grid.Column width={16}>
                    <Segment style={{ height: 150 }}>
                        <LoadingComponent text="Loading Profile..." />
                    </Segment>
                </Grid.Column>
            ) : (
                <Fragment>
                    <Grid.Column width={5}>
                        <ProfileCard 
                            setEditMode={setEditMode} 
                            isCurrentUser={isCurrentUser} 
                            profile={profile} 
                            deletePhoto={deletePhoto}
                            deleting={deleting}
                        />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        {editMode ? 
                            <PhotoUpload
                                setEditMode={setEditMode}
                                uploadPhoto={uploadPhoto}
                                uploading={uploading}
                            /> : <ProfileTab />} 
                    </Grid.Column>
                </Fragment>
            )}
        </Grid>
    )
}

export default observer(Profile)
