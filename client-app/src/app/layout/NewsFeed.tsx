import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Item, Segment, Image, Feed, Icon, Button } from 'semantic-ui-react'
import PostStore from '../../stores/postStore'
import { observer } from 'mobx-react-lite'
import { IPost } from '../models/post'
import LoadingComponent from '../common/loader/LoadingComponent'
import { RootStoreContext } from '../../stores/rootStore'

const NewsFeed = () => {
    const rootStore = useContext(RootStoreContext)
    const { loadPosts, postsRegistry, pageLoader } = rootStore.postsStore

    useEffect(() => {
        loadPosts()
    }, [loadPosts])

    if(pageLoader) return <LoadingComponent text="Loading Feed..." />

    return (
        <Fragment>
            {Array.from(postsRegistry.values()).map((post: IPost) => (
                <Segment key={post.postId}>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label image='/Images/user.png' />
                            <Feed.Content>
                                <Feed.Summary>
                                    {post.appUser.displayName}
                                    <Feed.Date>{post.postTime}</Feed.Date>
                                    <Button icon='ellipsis horizontal' floated='right' style={{backgroundColor: "white", border: 'none', padding: 0, paddingRight: 5}} />
                                </Feed.Summary>
                                <Feed.Extra text>
                                    {post.text}
                                </Feed.Extra>
                                <Feed.Meta>
                                    <Feed.Like>
                                        <Icon name='like' />5 people finds this helpful
                                    </Feed.Like>
                                </Feed.Meta>
                            </Feed.Content>
                        </Feed.Event>
                        <Button.Group fluid>
                            <Button icon='lightbulb' content='Helpful' />
                            <Button icon='comment' content='Comment' />
                            <Button icon='share' content='Share' />
                        </Button.Group>
                    </Feed>
                </Segment>
            ))}
        </Fragment>
    )
}

export default observer(NewsFeed)
