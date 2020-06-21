import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { IProfile } from '../../models/profile'

interface IProps {
    profile: IProfile | null,
    setEditMode: (value: boolean) => void,
    isCurrentUser: boolean
}

const ProfileCard: React.FC<IProps> = ({ profile, setEditMode, isCurrentUser }) => {
    return (
        <Card fluid>
            <Image src={profile?.photo?.url || '/Images/user.png'} wrapped ui={false} />
            <Card.Content>
                {isCurrentUser &&
                    <Button
                        onClick={() => setEditMode(true)}
                        style={{ position: 'relative', top: -15, right: -15 }}
                        floated='right'
                        basic size='tiny'
                        color='teal'
                        content='Change pic'
                    />
                }
                <Card.Header>{profile?.displayName}</Card.Header>
                <Card.Meta>
                    <span className='date'>Born in {profile && format(profile.dateOfBirth, "do MMM, yyyy")}</span>
                </Card.Meta>
                <Card.Description>
                    {profile?.displayName} is a musician living in Nashville.
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link to='/notfound'>
                    <Icon name='user' />
                    22 Friends
                </Link>
            </Card.Content>
        </Card>
    )
}

export default ProfileCard
