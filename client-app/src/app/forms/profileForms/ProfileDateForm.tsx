import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { IProfileFormValues, IProfile } from '../../models/profile'
import { Form, Button } from 'semantic-ui-react'
import DateInput from '../../common/formComponents/DateInput'

interface IProps {
    name: string,
    placeholder: string,
    setEditMode: (val: boolean) => void,
    profile: IProfile | null,
    type?: string
}

const ProfileEditForm: React.FC<IProps> = ({name, placeholder, type, setEditMode, profile}) => {
    const handleProfileSubmit = (values: IProfileFormValues) => {
        console.log(values)
    }

    return (
        <FinalForm
            initialValues={profile!}
            onSubmit={handleProfileSubmit}
            render={({handleSubmit}) => (
                <Form onSubmit={handleSubmit} style={{marginTop: 10}}>
                    <Field name={name} placeholder={placeholder} component={DateInput} />
                    <Button content='Save' size='tiny' />
                    <Button content='Cancel' size='tiny' onClick={(e) => {
                        e.preventDefault()
                        setEditMode(false)
                    }} />
                </Form>
            )}
        />
    )
}

export default ProfileEditForm
