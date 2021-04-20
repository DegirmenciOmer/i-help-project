import React from 'react'
import NewPopup from '../util/NewPopup'
import { Button, Icon, Label } from 'semantic-ui-react'

const CommentButton = ({ commentCount }) => {
  return (
    <NewPopup content='Comments'>
      <Button as='div' labelPosition='right'>
        <Button basic color='blue'>
          <Icon name='comments' />
        </Button>
        <Label basic color='blue' pointing='left'>
          {commentCount}
        </Label>
      </Button>
    </NewPopup>
  )
}

export default CommentButton
