import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import NewPopup from '../util/NewPopup'

function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const menuBar = user ? (
    <Menu pointing secondary size='massive'>
      <Menu.Item name={user.username} color='teal' active as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item className='logout' name='logout' onClick={logout}>
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
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}

export default MenuBar
