import React, { useContext, useEffect } from 'react'
import { Card, Icon, Image, Dropdown } from 'semantic-ui-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { IProfile } from '../../models/profile'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../stores/rootStore'

interface IProps {
    profile: IProfile | null,
    setEditMode: (value: boolean) => void,
    isCurrentUser: boolean,
    deletePhoto: (id: string) => Promise<void>,
    deleting: boolean
}

const dropdownStyle = {
    position: 'relative',
    top: -51,
    right: -18,
    float: 'right'
}

const ProfileCard: React.FC<IProps> = ({ profile, setEditMode, isCurrentUser, deletePhoto, deleting }) => {
    const rootStore = useContext(RootStoreContext)
    const {loadUserPosts, userPosts} = rootStore.profileStore

    useEffect(() => {
        loadUserPosts()
        return (() => {
            userPosts.clear()
        })
    }, [loadUserPosts, userPosts])

    return (
        <Card fluid>
            <Image src={(profile?.photo && profile?.photo.url) || '/Images/user.png'} wrapped ui={false} />
            <Card.Content>
                {isCurrentUser &&
                    <Dropdown
                        button
                        icon='pencil'
                        className='icon'
                        basic
                        loading={deleting}
                        pointing='top left'
                        style={dropdownStyle}
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item text={profile?.photo ? 'Change' : 'Add Photo'} onClick={() => setEditMode(true)} />
                            {profile?.photo && <Dropdown.Item text='Delete' onClick={() => deletePhoto(profile?.photo!.id)} />}
                        </Dropdown.Menu>
                    </Dropdown>
                }
                <Card.Header>{profile?.displayName}</Card.Header>
                <Card.Meta>
                    <span className='date'>Born in {profile && format(profile.dateOfBirth, "do MMM, yyyy")}</span>
                </Card.Meta>
                <Card.Description>
                    {profile?.bio}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link to='/notfound'>
                    <Icon name='user' />
                    {Array.from(userPosts.values()).length} Posts
                </Link>
            </Card.Content>
        </Card>
    )
}

export default observer(ProfileCard)
