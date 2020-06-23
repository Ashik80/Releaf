import React from 'react'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'
import { FieldRenderProps } from 'react-final-form'
import { DateTimePicker } from 'react-widgets'

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const TextInput: React.FC<IProps> = ({input, placeholder, meta: {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error}>
            <DateTimePicker
                value={input.value}
                onChange={input.onChange}
                placeholder={placeholder}
                onBlur={input.onBlur}
                time={false}
                onKeyDown={(e) => e.preventDefault()}
            />
            {touched && error && (
                <Label content={error} basic color='red' />
            )}
        </Form.Field>
    )
}

export default TextInput
