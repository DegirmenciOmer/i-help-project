import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`

{
    getPosts{
        id body createdAt username 
        likeCount
        likes{
            id username createdAt
        }
        commentCount
        comments{
            id username createdAt body
        }
    }
}
`