import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Image, Grid, Card, Button, Icon, Form } from 'semantic-ui-react'
import { useForm } from '../util/hooks'
import ImageUpload from '../components/ImageUpload'

const Profile = (props) => {
    const userId = props.match.params.userId
    const [toggle, setToggle] = useState(false)

    const { data } = useQuery(FETCH_USER_QUERY, { 
        variables: {
        userId
        }
    })

    //update user {
    const { values, onChange, onSubmit } = useForm(updateUserCallback, {
        userId,
        email: '',
        username: '',
        imageUrl: ''
    })
    const [updateUser] = useMutation(FETCH_USER_MUTATION, {
        variables: values,
    
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_USER_QUERY,
                variables: values,
            })
            const newData = [result.data.updateUser, data.updateUser]
        
            proxy.writeQuery({
                query: FETCH_USER_QUERY,
                data: {
                ...data,
                getUser: {
                    newData,
                },
                },
            })
            setToggle(false)
        },
        onError(err) {
            console.log(err && err.graphQLErrors[0] ? err.graphQLErrors[0] : err)
        },
    })
    function updateUserCallback() {
        updateUser()
    }

    if (!data) {
        return null
    }
    

    console.log(userId)
    console.log(data.getUser.username)
    return (
        <Grid>
        <Grid.Row>
        <Grid.Column width={10}>
            <h2>Profile page</h2>
            <Card>
                <Image src={data.getUser.imageUrl} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{data.getUser.username}</Card.Header>
                <Card.Meta>
                    <span className='date'>{data.getUser.createdAt}</span>
                </Card.Meta>
                <Card.Description>
                    {data.getUser.email}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Card.Meta>
                    {data.getUser.username && (
                        <Icon
                        onClick={() => setToggle(true)}
                        name='edit'/>
                    )} 
                </Card.Meta>
                </Card.Content>
                {!toggle ? (
                <Card.Description>Update your data</Card.Description>
                ) : (
                
                    <Form onSubmit={onSubmit}>
                        <Form.Field>
                            <Form.Input
                                name='username'
                                type='text'
                                placeholder={data.getUser.username}
                                label='Username'
                                value={values.username }
                                onChange={onChange}
                            />
                            <ImageUpload
                            onUploadComplite={(evt, data) => {
                                onChange(evt, data)
                            }}
                            />
                            <Form.Input
                                name='email'
                                type='email'
                                placeholder={data.getUser.email}
                                label='Email'
                                value={values.email}
                                onChange={onChange}
                            />
                            <Button color='teal' type='submit'>
                                Save
                            </Button>
                        </Form.Field>
                    </Form>
                )}
            </Card>

        </Grid.Column>
        </Grid.Row>
        </Grid>
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
export const FETCH_USER_MUTATION = gql`
    mutation ($userId: ID!, $username: String!, $imageUrl: String, $email: String!){
        updateUser(userId: $userId, username: $username, imageUrl: $imageUrl, email: $email){
                username
                email
                imageUrl
        }
    }
` 


export default Profile
