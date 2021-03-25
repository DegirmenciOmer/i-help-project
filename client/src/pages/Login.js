import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'

import { useForm } from '../util/hooks'
import { Link } from 'react-router-dom'

const Login = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  function loginUserCallback() {
    loginUser()
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          name='username'
          type='text'
          placeholder='Username...'
          label='Username'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
          autoComplete='username'
        />
        <Form.Input
          name='password'
          type='password'
          placeholder='Password...'
          label='Password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
          autoComplete='current-password'
        />
        <Button type='submit' primary>
          Login
        </Button>
        <p>
          Not a member?{' '}
          <Button className='basic teal' as={Link} to='/register'>
            Register
          </Button>
        </p>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message '>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Login
