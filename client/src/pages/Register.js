import React, {useState} from 'react';
import { Button, Form } from 'semantic-ui-react';
import {useMutation} from '@apollo/client';
import gql from 'graphql-tag';


const Register = () => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    
    
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result){
            console.log(result);
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    }) 
    const onChange = (e) => {
        // ???
        setValues({...values, [e.target.name] : e.target.value})
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addUser();
    };

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input 
                    name='username'
                    type='text'
                    placeholder='Username...'
                    label='Username'
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input 
                    name='email'
                    type='email'
                    placeholder='Email...'
                    label='Email'
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input 
                    name='password'
                    type='password'
                    placeholder='Password...'
                    label='Password'
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input 
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm password...'
                    label='Confirm Password'
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Register
                </Button>    
            </Form>
            {Object.keys(errors).length > 0 && ( 
                <div className='ui error message '>
                <ul className='list'>
                    {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>  
            )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword     
        }
        ) {
        id
        email
        username
        createdAt
        token
        }
    }
`;


export default Register
