import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const PostForm = () => {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: '' 
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        // source https://www.apollographql.com/docs/react/caching/cache-configuration/#generating-unique-identifiers
        update(cache, result) {
            const data = cache.readQuery({
                query: FETCH_POSTS_QUERY
            });
            // must make a copy of each state, use newData
            let newData = [...data.getPosts];
            newData = [result.data.createPost, ...newData];
            cache.writeQuery({ query: FETCH_POSTS_QUERY,
                data: {
                    ...data,
                    getPosts: {
                        newData,
                    },
                },
            });
        }
    });

    function createPostCallback(){
        createPost();
    } 

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Social network"
                    name='body'
                    onChange={onChange}
                    value={values.body}
                />
                <Button color='teal' type='submit'>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;
