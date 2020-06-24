import React from 'react'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'
import { FieldRenderProps } from 'react-final-form'

interface IProps extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps {}

const TextAreaInput: React.FC<IProps> = ({input, placeholder, rows, meta: {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error}>
            <textarea {...input} placeholder={placeholder} rows={rows} />
            {touched && error && (
                <Label content={error} basic color='red' />
            )}
        </Form.Field>
    )
}

export default TextAreaInput