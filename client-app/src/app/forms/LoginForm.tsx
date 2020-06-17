import React, { Fragment } from 'react'
import {Form as FinalForm, Field} from 'react-final-form'
import { Form, Header, Button } from 'semantic-ui-react'
import TextInput from '../common/formComponents/TextInput'

const LoginForm = () => {
    const handleLogin = (values: any) => {
        console.log(values)
    }    

    return (
        <Fragment>
            <FinalForm onSubmit={handleLogin}
                render={({handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <Header content="Login to Releaf" textAlign='center' color='teal' as='h2' />
                        <Field name='email' placeholder='Email...' component={TextInput} /> 
                        <Field name='password' type='password' placeholder='Password...' component={TextInput} /> 
                        <Button fluid type='submit' color='teal' content='Login' />
                    </Form>
                )}
            />
        </Fragment>
    )
}

export default LoginForm
