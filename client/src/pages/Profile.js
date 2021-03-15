import React from 'react'
import { gql, useQuery } from "@apollo/client"

const Profile = () => {
    const { loading, error, data } = useQuery(ME_QUERY)
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    return (
        <div className='form-container'>
        <h2>Profile page</h2>
            {data}
        </div>
    )
}

export const ME_QUERY = gql`
    query getUser{
        getUser{
            id
            User{
                username
                email
                imageUrl

            }
        }
    }
` 

export default Profile
