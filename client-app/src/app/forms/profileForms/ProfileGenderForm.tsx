import React, { useState, SyntheticEvent, useContext } from 'react'
import { IProfileFormValues, IProfile } from '../../models/profile'
import { Form, Button } from 'semantic-ui-react'
import { RootStoreContext } from '../../../stores/rootStore'

interface IProps {
    name: string,
    setEditMode: (val: boolean) => void,
    profile: IProfile | null,
    type?: string
}

const ProfileGenderForm: React.FC<IProps> = ({ name, type, setEditMode, profile }) => {
    const initializeForm: IProfileFormValues = {
        displayName: profile?.displayName,
        bio: profile?.bio,
        address: profile?.address,
        dateOfBirth: profile?.dateOfBirth,
        gender: profile?.gender
    }

    const [gender, setGender] = useState({
        gen: (profile ? profile.gender : "Male")
    })
    const [loading, setLoading] = useState(false)

    const rootStore = useContext(RootStoreContext)
    const {updateProfile} = rootStore.profileStore

    const handleChange = (event: any) => {
        setGender({
            gen: event.currentTarget.value
        })
    }

    const handleProfileSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        initializeForm.gender = gender.gen
        if(profile){
            updateProfile(profile.userName, initializeForm)
                .then(() => setLoading(false))
                .then(() => setEditMode(false))
        }
    }

    return (
        <Form onSubmit={handleProfileSubmit} style={{ marginTop: 10 }}>
            <Form.Group inline>
                <Form.Field type='radio' control='input' label='Male' name='gender' value='Male' onChange={handleChange} checked={gender.gen === 'Male'} />
                <Form.Field type='radio' control='input' label='Female' name='gender' value='Female' onChange={handleChange} checked={gender.gen === 'Female'} />
                <Form.Field type='radio' control='input' label='Other' name='gender' value='Other' onChange={handleChange} checked={gender.gen === 'Other'} />
            </Form.Group>
            <Button loading={loading} content='Save' size='tiny' />
            <Button content='Cancel' size='tiny' onClick={(e) => {
                e.preventDefault()
                setEditMode(false)
            }} />
        </Form>
    )
}

export default ProfileGenderForm