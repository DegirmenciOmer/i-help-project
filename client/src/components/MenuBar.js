import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  
  const [activeItem, setActiveItem] = useState(window.location.pathname)
  
  const handleItemClick = (newPath) => setActiveItem(newPath)

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item 
        name={user.username}
        active={activeItem === '/'}
        onClick={()=>handleItemClick('/')} 
        as={Link} 
        to='/' />
      <Menu.Menu position='right' >
      <Menu.Item 
        name='profile' 
        active={activeItem === `/profile/${user.id}`}
        onClick={()=>handleItemClick(`/profile/${user.id}`)} 
        as={Link} 
        to={`/profile/${user.id}`}>
        
      </Menu.Item>
      <Menu.Item 
        name='logout' 
        onClick={logout} 
        as={Link}
        to='/' 
      />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === '/'}
        onClick={()=>handleItemClick('/')}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === '/login'}
          onClick={()=>handleItemClick('/login')}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === '/register'}
          onClick={()=>handleItemClick('/register')}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}

export default MenuBar
