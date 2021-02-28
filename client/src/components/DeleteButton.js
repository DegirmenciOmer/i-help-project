import React, {useState} from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import {useMutation} from '@apollo/client';
import gql from 'graphql-tag';

import { FETCH_POSTS_QUERY } from '../util/graphql';

const DeleteButton = ({ postId, callback }) => {
    
    const [confirmOpen, setConfirmOpen] = useState(false);
    
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy){
            setConfirmOpen(false);

            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            // create a new variable for refresh result
            const newDataGroups = [...data.getPosts];
            newDataGroups[postId.id] = newDataGroups.filter(p =>  p.id !== postId);
            proxy.writeQuery({ query: FETCH_POSTS_QUERY,
                data: {
                    ...data,
                    getPosts: {
                        newDataGroups,
                    },
                },
            }); 
            if(callback) callback();
        },
        variables: {
            postId
            
        }, onError(err) {
                console.log(err&&err.graphQLErrors[0]?err.graphQLErrors[0]:err) 
        },
    })

    return (
        <>
            <Button 
                as="div"
                color="red"
                floated="right"
                onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' style={{margin: 0}}/>
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export default DeleteButton
