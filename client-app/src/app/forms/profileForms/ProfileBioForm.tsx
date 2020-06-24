import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { IProfileFormValues, IProfile } from '../../models/profile'
import { Form, Button } from 'semantic-ui-react'
import TextAreaInput from '../../common/formComponents/TextAreaInput'
import { RootStoreContext } from '../../../stores/rootStore'

interface IProps {
    name: string,
    placeholder: string,
    setEditMode: (val: boolean) => void,
    profile: IProfile | null,
    type?: string
}

const ProfileBioForm: React.FC<IProps> = ({name, placeholder, type, setEditMode, profile}) => {
    const initializeForm: IProfileFormValues = {
        displayName: profile?.displayName,
        bio: profile?.bio,
        address: profile?.address,
        dateOfBirth: profile?.dateOfBirth,
        gender: profile?.gender
    }

    const rootStore = useContext(RootStoreContext)
    const {updateProfile} = rootStore.profileStore

    const handleProfileSubmit = (values: IProfileFormValues) => {
        if(profile){
            updateProfile(profile.userName, values).then(() => setEditMode(false))
        }
    }

    return (
        <FinalForm
            initialValues={initializeForm!}
            onSubmit={handleProfileSubmit}
            render={({handleSubmit, submitting, pristine}) => (
                <Form onSubmit={handleSubmit} style={{marginTop: 10}}>
                    <Field name={name} placeholder={placeholder} type={type} rows={3} component={TextAreaInput} />
                    <Button disabled={pristine} loading={submitting} content='Save' size='tiny' />
                    <Button content='Cancel' size='tiny' onClick={(e) => {
                        e.preventDefault()
                        setEditMode(false)
                    }} />
                </Form>
            )}
        />
    )
}

export default ProfileBioForm