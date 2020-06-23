import React, { useContext, useState, SyntheticEvent, } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IPostFormValues } from '../models/post'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite'

const CreatePost = () => {
    const rootStore = useContext(RootStoreContext)
    const { createPost, loading } = rootStore.postsStore
    const [text, setText] = useState<IPostFormValues>({text: ''})

    const handleChange = (event: any) => {
        setText({
            text: event.target.value
        })
    }

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement >) => {
        event.preventDefault()
        createPost(text).then(() => {
            setText({
                text: ''
            })
        })
    }

    return (
        <Segment className='postForm'>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <textarea
                        rows={4}
                        placeholder='Something on your mind?'
                        value={text.text} name='text'
                        onChange={(e) => handleChange(e)}
                        style={{marginBottom: 10}}
                    />
                    <Button loading={loading} color='teal' content='Post' type='submit' />
                </Form.Field>
            </Form>
        </Segment>
    )
}

export default observer(CreatePost)
