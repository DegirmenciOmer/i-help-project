import React from 'react'
import { gql, useQuery } from "@apollo/client"
import { Image } from 'semantic-ui-react'

const Profile = (props) => {
    const userId = props.match.params.userId

    const { data } = useQuery(FETCH_USER_QUERY, { 
        variables: {
        userId,
        }
    })

    if (!data) {
        return null
    }
    console.log(userId)
    console.log(data.getUser.username)
    return (
        <div className='form-container'>
        <h2>Profile page</h2>
            <Image  size='small' src={data.getUser.imageUrl} />
            <div>{data.getUser.username}</div>
            <div>{data.getUser.email}</div>
        </div>
    )
}

export const FETCH_USER_QUERY = gql`
    query getUser($userId: ID!){
        getUser(userId: $userId){
                username
                email
                imageUrl
        }
    }
` 

export default Profile
