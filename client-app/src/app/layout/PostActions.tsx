import React, { SyntheticEvent } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { IPost } from '../models/post'
import { observer } from 'mobx-react-lite'

interface IProps {
    post: IPost,
    likeHandle: (event: SyntheticEvent<HTMLButtonElement>) => void,
    disable: boolean,
    target: string
}

const PostActions: React.FC<IProps> = ({post, likeHandle, disable, target}) => {
    return (
        <Button.Group fluid>
            <Button disabled={disable && target === post.postId} name={post.postId} onClick={(e) => likeHandle(e)}>
                <span style={post.isLiked ? { color: 'orange' } : { textDecoration: 'none' }}>
                    <Icon name='lightbulb' />
                    Helpful
                </span>
            </Button>
            <Button icon='comment' content='Comment' />
            <Button icon='share' content='Share' />
        </Button.Group>
    )
}

export default observer(PostActions)
