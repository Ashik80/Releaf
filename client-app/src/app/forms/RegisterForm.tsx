import React, { useContext, Fragment } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Button, Header } from 'semantic-ui-react'
import TextInput from '../common/formComponents/TextInput'
import { RootStoreContext } from '../../stores/rootStore'
import { FORM_ERROR } from 'final-form'
import ErrorMessage from '../errors/ErrorMessage'
import { combineValidators, isRequired, composeValidators } from 'revalidate'
import { observer } from 'mobx-react-lite'

const validate = combineValidators({
    email: isRequired('Email'),
    userName: isRequired('Username'),
    displayName: isRequired('Display Name'),
    password: composeValidators(
        isRequired('Password')
    )()
})

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext)
    const { register } = rootStore.userStore

    return (
        <Fragment>
            <FinalForm
                validate={validate}
                onSubmit={(values: any) => 
                    register(values).catch(error => ({
                        [FORM_ERROR]: error
                    }))
                }
                render={({ handleSubmit, submitError, hasSubmitErrors, submitting, invalid, dirtySinceLastSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Header as='h2' color='teal' content='Register in Releaf' textAlign='center' />
                        <Field name='email' placeholder='Email' component={TextInput} />
                        <Field name='userName' placeholder='Username' component={TextInput} />
                        <Field name='displayName' placeholder='Display name' component={TextInput} />
                        <Field name='password' type='password' placeholder='Password' component={TextInput} />
                        {hasSubmitErrors && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}
                        <Button loading={submitting} disabled={invalid && !dirtySinceLastSubmit} fluid type='submit' color='teal' content='Register' />
                    </Form>
                )}
            />
        </Fragment>
    )
}

export default observer(RegisterForm)
