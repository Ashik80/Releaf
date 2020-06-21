import React, { Fragment, useContext, useEffect, SyntheticEvent, useState } from 'react'
import { Segment, Feed, Icon, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { IPost } from '../models/post'
import LoadingComponent from '../common/loader/LoadingComponent'
import { RootStoreContext } from '../../stores/rootStore'
import PostActions from './PostActions'
import {format} from 'date-fns'
import { Link } from 'react-router-dom'

const NewsFeed = () => {
    const rootStore = useContext(RootStoreContext)
    const { loadPosts, pageLoader, likePost, postsByDate, disableLike, postsRegistry } = rootStore.postsStore
    const [target, setTarget] = useState('')

    const likeHandle = (event: SyntheticEvent<HTMLButtonElement>) => {
        likePost(event.currentTarget.name)
        setTarget(event.currentTarget.name)
    }

    useEffect(() => {
        loadPosts()
        return (() => {
            postsRegistry.clear()
        })
    }, [loadPosts, postsRegistry])

    if (pageLoader) return <Segment style={{height: 150}}><LoadingComponent text="Loading Feed..." /></Segment>

    return (
        <Fragment>
            {postsByDate.map((post: IPost) => (
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
        </Fragment>
    )
}

export default observer(NewsFeed)
