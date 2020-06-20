import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { IProfile } from '../../models/profile'

interface IProps {
    profile: IProfile | null
}
// format(profile?.dateOfBirth, "do MMM, yyyy")

const ProfileCard: React.FC<IProps> = ({profile}) => {
    return (
        <Card fluid>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
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
