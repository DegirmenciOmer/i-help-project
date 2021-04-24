import React from 'react'
import { Popup } from 'semantic-ui-react'

const NewPopup = ({ content, children }) => {
  return <Popup inverted content={content} trigger={children}></Popup>
}

export default NewPopup
