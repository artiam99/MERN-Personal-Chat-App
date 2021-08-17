import React from 'react'
import { Menu, Container, Icon, Dropdown } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { logoutUser } from '../../utils/authUser'


function MobileHeader({ user: { email, unreadMessage, username } })
{
  const router = useRouter()
  const isActive = route => router.pathname === route

  return (
    <>
      <Menu fluid borderless>
        <Container text>

          <Link href='/messages'>
            <Menu.Item header active={isActive('/messages') || unreadMessage}>
              <Icon name={unreadMessage ? 'hand point right' : 'mail outline'} size='large' />
            </Menu.Item>
          </Link>

          <Dropdown item icon='bars' direction='left'>
            <Dropdown.Menu>
              <Link href={`/${username}`}>
                <Dropdown.Item active={isActive(`/${username}`)}>
                  <Icon name='user' size='large' />
                  Account
                </Dropdown.Item>
              </Link>

              <Dropdown.Item onClick={() => logoutUser(email)}>
                <Icon name='sign out alternate' size='large' />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    </>
  )
}

export default MobileHeader