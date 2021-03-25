import React, { useState, useEffect} from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Image, Grid, Card, Button, Icon, Form } from 'semantic-ui-react'
import { useForm } from '../util/hooks'
import ImageUpload from '../components/ImageUpload'

const Profile = (props) => {
    
    const userId = props.match.params.userId
    const [toggle, setToggle] = useState(false)
    const [errors, setErrors] = useState({})

    //update user {
    const { values, onChange, onSubmit, setValues } = useForm(updateUserCallback, {
        userId,
        email: '',
        imageUrl: ''
    })
    console.log(values)
    const { data } = useQuery(FETCH_USER_QUERY, { 
        variables: {
        userId
        }
    })
    useEffect(() => {
        if (!data) {
            return
        }
        setValues((prevState) => ({ ...prevState,  ...data.getUser }))
    }, [data, setValues])

    const [updateUser, {loading}] = useMutation(FETCH_USER_MUTATION)
    
    function updateUserCallback() {
        updateUser(
            {
                variables: values,
            
                update(cache, result) {
                    const data = cache.readQuery({
                        query: FETCH_USER_QUERY,
                        variables: values,
                    })
                    const newData = {...data.getUser, ...result.data.updateUser}
                    
                    cache.writeQuery({
                        query: FETCH_USER_QUERY,
                        variables: {userId},
                        data: {
                            getUser: newData,
                        },
                    })
                    setToggle(false)
                },
                onError(err) {
                    setErrors(err.graphQLErrors[0].extensions.exception.errors)
                },
            }
        )
    }
    
    if (!data) {
        return null
    }
    
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
                            {/* <Form.Input
                                name='username'
                                type='text'
                                placeholder={data.getUser.username}
                                label='Username'
                                value={values.username }
                                error={errors.username ? true : false}
                                onChange={(evt, data) => {
                                onChange(evt, data)
                            }}
                            /> */}
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
    mutation ($userId: ID!, $imageUrl: String, $email: String!){
        updateUser(userId: $userId, imageUrl: $imageUrl, email: $email){
                email
                imageUrl
        }
    }
` 
export default Profile
