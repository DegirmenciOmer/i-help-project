import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Image, Grid, Card, Button, Icon, Form } from 'semantic-ui-react'
import { useForm } from '../util/hooks'
import ImageUpload from '../components/ImageUpload'



const Profile = (props) => {
    
    const userId = props.match.params.userId
    const [toggle, setToggle] = useState(false)
    const [errors, setErrors] = useState({})

    //update user {
    const { values, onChange, onSubmit } = useForm(updateUserCallback, {
        userId,
        email: '',
        username: '',
        imageUrl: ''
    })

    const { data } = useQuery(FETCH_USER_QUERY, { 
        variables: {
        userId
        }
    })

    const [updateUser, {loading}] = useMutation(FETCH_USER_MUTATION, {
        variables: values,
    
        update(cache, result) {
            const data = cache.readQuery({
                query: FETCH_USER_QUERY,
                variables: values,
            })
            const newData = [result.data.updateUser, data.getUser]
        
            cache.writeQuery({
                query: FETCH_USER_QUERY,
                data: {
                    getUser: {
                        newData,
                    },
                },
            })
            setToggle(false)
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
    })
    function updateUserCallback() {
        updateUser()
    }

    if (!data) {
        return null
    }
    
    console.log(data)
    
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

                </Card.Content>
                {!toggle ? (
                <Card.Description> 
                    <Button color='teal' type='submit' onClick={() => setToggle(true)}>
                        <Icon
                        name='edit outline'
                        />update</Button></Card.Description>
                ) : (
                
                    <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                        <Form.Field>
                            <Form.Input
                                name='username'
                                type='text'
                                placeholder={data.getUser.username}
                                label='Username'
                                value={values.username }
                                error={errors.username ? true : false}
                                onChange={(evt, data) => {
                                onChange(evt, data)
                            }}
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
                                error={errors.email ? true : false}
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
            {Object.keys(errors).length > 0 && (
                <div className='ui error message '>
                    <ul className='list'>
                        {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
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
