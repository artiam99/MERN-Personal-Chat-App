import React, { useState } from 'react'
import { Form, Segment } from 'semantic-ui-react'


function MessageInputField({ sendMsg })
{
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ position: 'sticky', bottom: '0', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
      <Segment secondary color='teal' attached='bottom'>
        <Form
          reply
          onSubmit={e =>
                    {
                      e.preventDefault()
                      sendMsg(text)
                      setText('')
                    }}
        >
          <Form.Input
            size='large'
            placeholder='Send New Message'
            value={text}
            onChange={e => setText(e.target.value)}
            action={{
                      color: 'blue',
                      icon: 'telegram plane',
                      disabled: text === '',
                      loading: loading
                    }}
          />
        </Form>
      </Segment>
    </div>
  )
}

export default MessageInputField