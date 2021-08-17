import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { logoutUser } from '../../utils/authUser'


function SideMenu({ user: { email, unreadMessage, username }, pc = true })
{
  const router = useRouter()

  const isActive = route => router.pathname === route


  return (
    <>
      <List style={{ paddingTop: '1rem', boxShadow: '0 0 15px rgba(0,0,0,0.25)', clipPath: 'inset(0px -15px 0px 0px)' }}
            size='big' verticalAlign='middle' selection>

        <Link href='/messages'>
          <List.Item active={isActive('/messages')}>
            <Icon
              name={unreadMessage ? 'hand point right' : 'mail outline'}
              size='large'
              color={(isActive('/messages') && 'teal') || (unreadMessage && 'orange') || 'grey'}
            />
            <List.Content>{pc && <List.Header content='Messages' />}</List.Content>
          </List.Item>
        </Link>
        <br />

        <Link href={`/${username}`}>
          <List.Item active={router.query.username === username}>
            <Icon
              name='user'
              size='large'
              color={(router.query.username === username && 'teal') || 'grey'}
            />
            <List.Content>{pc && <List.Header content='Account' />}</List.Content>
          </List.Item>
        </Link>
        <br />

        <List.Item onClick={() => logoutUser(email)}>
          <Icon name='log out' size='large' color='grey' />
          <List.Content>{pc && <List.Header content='Logout' />}</List.Content>
        </List.Item>
      </List>
    </>
  )
}

export default SideMenu