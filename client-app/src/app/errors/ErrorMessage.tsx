import React from 'react'
import { Message } from 'semantic-ui-react'
import { AxiosResponse } from 'axios'

interface IProps {
    error: AxiosResponse,
    text?: string
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
    return (
        <Message negative>
            <Message.Header>{error.statusText}</Message.Header>
            {error.data && Object.keys(error.data.errors).length > 0 && (
                <Message.List>
                    {Object.values(error.data.errors).flat().map((err: any, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}

export default ErrorMessage
