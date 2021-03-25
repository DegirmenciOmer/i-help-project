import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import NewPopup from '../util/NewPopup'

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
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}

export default MenuBar
