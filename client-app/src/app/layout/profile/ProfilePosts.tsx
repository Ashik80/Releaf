import React, { useContext, useState, SyntheticEvent } from 'react'
import { Tab, Segment, Feed, Button, Icon } from 'semantic-ui-react'
import { RootStoreContext } from '../../../stores/rootStore'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import PostActions from '../PostActions'

const ProfilePosts = () => {
    const rootStore = useContext(RootStoreContext)
    const { postsByDate, postLoader, likePost, disableLike, } = rootStore.profileStore

    const [target, setTarget] = useState('')

    const likeHandle = (event: SyntheticEvent<HTMLButtonElement>) => {
        likePost(event.currentTarget.name)
        setTarget(event.currentTarget.name)
    }

    return (
        <Tab.Pane loading={postLoader}>
            {postsByDate.map(post => (
                <Segment key={post.postId}>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label image={post.appUser.photo?.url || '/Images/user.png'} />
                            <Feed.Content>
                                <Feed.Summary>
                                    <Link
                                        to={`/profile/${post.appUser.userName}`}
                                    >
                                        {post.appUser.displayName}
                                    </Link>
                                    <Feed.Date>{format(post.postTime, "h:mm aaaa, eee, do MMM, yyyy")}</Feed.Date>
                                    <Button icon='ellipsis horizontal' floated='right' style={{ backgroundColor: "white", border: 'none', padding: 0, paddingRight: 5 }} />
                                </Feed.Summary>
                                <Feed.Extra text>
                                    {post.text}
                                </Feed.Extra>
                                {post.likes.length > 0 && (
                                    <Feed.Meta>
                                        <Feed.Like>
                                            <Icon name='lightbulb' color='yellow' />{post.likes.length} {post.likes.length === 1 ? "person finds" : "people find"} this helpful
                                    </Feed.Like>
                                    </Feed.Meta>
                                )}
                            </Feed.Content>
                        </Feed.Event>
                        <PostActions disable={disableLike} post={post} likeHandle={likeHandle} target={target} />
                    </Feed>
                </Segment>
            ))}
        </Tab.Pane>
    )
}

export default observer(ProfilePosts)
