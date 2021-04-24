import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import NewPopup from '../util/NewPopup'

function MenuBar() {
  const location = useLocation()
  const { user, logout } = useContext(AuthContext)

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name={user.username}
        active={location.pathname === '/'}
        as={Link}
        to='/'
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='profile'
          active={location.pathname === `/profile/${user.id}`}
          as={Link}
          to={`/profile/${user.id}`}
        ></Menu.Item>

        <Menu.Item
          className='logout'
          name='logout'
          onClick={logout}
          as={Link}
          to='/'
        >
          <NewPopup content='Logout'>
            <i className='fas fa-sign-out-alt'></i>
          </NewPopup>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={location.pathname === '/'}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={location.pathname === '/login'}
          as={Link}
          to='/login'
        />
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}

export default MenuBar
