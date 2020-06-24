import React, { useContext, useState } from 'react'
import { Header, Tab, Container, Segment, Button } from 'semantic-ui-react'
import { RootStoreContext } from '../../../stores/rootStore'
import { format } from 'date-fns'
import ProfileEditForm from '../../forms/profileForms/ProfileEditForm'
import ProfileDateForm from '../../forms/profileForms/ProfileDateForm'
import ProfileGenderForm from '../../forms/profileForms/ProfileGenderForm'
import ProfileBioForm from '../../forms/profileForms/ProfileBioForm'
import { observer } from 'mobx-react-lite'

const spanStyle = {
    display: 'inline-block',
    width: '10vw',
    fontWeight: 800,
    verticalAlign: 'top'
}

const editButton = {
    backgroundColor: "white",
    border: 'none',
    float: 'right',
    marginTop: -5
}

const ProfileAbout = () => {
    const rootStore = useContext(RootStoreContext)
    const { profile, isCurrentUser } = rootStore.profileStore
    const [editName, setNameMode] = useState(false)
    const [editDate, setDateMode] = useState(false)
    const [editAdress, setAdress] = useState(false)
    const [editGender, setGenderMode] = useState(false)
    const [editBio, setBioMode] = useState(false)

    return (
        <Tab.Pane>
            <Header icon='user circle' content='Profile info' /><br />
            <Container style={{ paddingLeft: 30, paddingRight: 30 }}>
                <Segment vertical>
                    <span style={spanStyle}>Display Name:</span> {editName ? 
                        <ProfileEditForm
                            name='displayName' 
                            profile={profile} 
                            placeholder='Name' 
                            setEditMode={setNameMode} 
                        /> : profile?.displayName}
                    {isCurrentUser && !editName && <Button icon='pencil' style={editButton} onClick={() => setNameMode(true)} />}
                </Segment>
                <Segment vertical>
                    <span style={spanStyle}>Date of birth:</span> {editDate ? 
                        <ProfileDateForm
                            name='dateOfBirth'
                            profile={profile} 
                            placeholder='Date of birth' 
                            setEditMode={setDateMode} 
                        /> : profile && format(profile.dateOfBirth, "do MMM, yyyy")}
                    {isCurrentUser && !editDate && <Button icon='pencil' style={editButton} onClick={() => setDateMode(true)} />}
                </Segment>
                <Segment vertical>
                    <span style={spanStyle}>Gender:</span> {editGender ? 
                        <ProfileGenderForm
                            name='gender' 
                            profile={profile} 
                            setEditMode={setGenderMode} 
                        /> : profile?.gender}
                    {isCurrentUser && !editGender && <Button icon='pencil' style={editButton} onClick={() => setGenderMode(true)} />}
                </Segment>
                <Segment vertical>
                    <span style={spanStyle}>Adress:</span> {editAdress ? 
                        <ProfileEditForm
                            name='address' 
                            profile={profile} 
                            placeholder='Adress' 
                            setEditMode={setAdress} 
                        /> : profile?.address}
                    {isCurrentUser && !editAdress && <Button icon='pencil' style={editButton} onClick={() => setAdress(true)} />}
                </Segment>
                <Segment vertical>
                    <span style={spanStyle}>Bio:</span> {editBio ? 
                        <ProfileBioForm
                            name='bio'
                            profile={profile} 
                            placeholder='Bio' 
                            setEditMode={setBioMode} 
                        /> : <span style={{display: 'inline-block', width: '30vw'}}>{profile?.bio}</span>}
                    {isCurrentUser && !editBio && <Button icon='pencil' style={editButton} onClick={() => setBioMode(true)} />}
                </Segment>
            </Container>
        </Tab.Pane>
    )
}

export default observer(ProfileAbout)
