import React from 'react'
import { Menu } from 'semantic-ui-react'


function ProfileMenuTabs({ activeItem, handleItemClick, ownAccount })
{
  return (
    <>
      <Menu pointing secondary>
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={() => handleItemClick('profile')}
        />


        {ownAccount && (
          <>
            <Menu.Item
              name='Update Profile'
              active={activeItem === 'updateProfile'}
              onClick={() => handleItemClick('updateProfile')}
            />
          </>
        )}
      </Menu>
    </>
  )
}

export default ProfileMenuTabs