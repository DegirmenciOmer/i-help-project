import React, { useContext } from 'react';
import {useQuery} from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const Home = () => {
    const { user } = useContext(AuthContext);
    const {
        loading,
        data
    } = useQuery(FETCH_POSTS_QUERY);

    if(!data){
        return null
    }

    const  {getPosts: posts} = data;

    return (
        <Grid columns={3}>
            <Grid.Row className='page-title'>
                <h1>Recents posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                {loading ? (
                    <h2>Loading posts ...</h2>
                ) : (
                    <Transition.Group>
                        {
                            posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom: 20}}>
                            <PostCard post={post}/>
                        </Grid.Column>
                    ))
                        }
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home
