import { Message, Button } from 'semantic-ui-react'

export const NoMessages = () => 
(
  <Message
    info
    icon='telegram plane'
    header='Sorry'
    content='You have not messaged anyone yet.Search above to message someone!'
  />
)


export const NoProfile = () => 
(
  <Message info icon='meh' header='Hey!' content='No Profile Found.' />
)