import React, { Fragment, useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Header, Button } from 'semantic-ui-react'
import TextInput from '../common/formComponents/TextInput'
import { ILoginFormValues } from '../models/appUser'
import { RootStoreContext } from '../../stores/rootStore'
import {combineValidators, isRequired} from 'revalidate'
import { FORM_ERROR } from 'final-form'
import { observer } from 'mobx-react-lite'
import ErrorMessage from '../errors/ErrorMessage'

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password')
})

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext)
    const { login } = rootStore.userStore

    return (
        <Fragment>
            <FinalForm onSubmit={(values: ILoginFormValues) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))} validate={validate}
                render={({ handleSubmit, submitError, hasSubmitErrors, dirtySinceLastSubmit, submitting, invalid }) => (
                    <Form onSubmit={handleSubmit}>
                        <Header content="Login to Releaf" textAlign='center' color='teal' as='h2' />
                        <Field name='email' placeholder='Email...' component={TextInput} />
                        <Field name='password' type='password' placeholder='Password...' component={TextInput} />
                        {hasSubmitErrors && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}
                        <Button disabled={invalid && !dirtySinceLastSubmit} loading={submitting} fluid type='submit' color='teal' content='Login' />
                    </Form>
                )}
            />
        </Fragment>
    )
}

export default observer(LoginForm)
