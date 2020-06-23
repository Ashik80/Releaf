import React from 'react'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'
import { FieldRenderProps } from 'react-final-form'

interface IProps extends FieldRenderProps<string, HTMLInputElement>, FormFieldProps {}

const TextInput: React.FC<IProps> = ({input, placeholder, width, meta: {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error}>
            <input {...input} placeholder={placeholder} />
            {touched && error && (
                <Label content={error} basic color='red' />
            )}
        </Form.Field>
    )
}

export default TextInput
