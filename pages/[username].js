import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { parseCookies } from 'nookies'
import { Grid } from 'semantic-ui-react'
import { NoProfile } from '../components/Layout/NoData'
import ProfileMenuTabs from '../components/Profile/ProfileMenuTabs'
import ProfileHeader from '../components/Profile/ProfileHeader'
import UpdateProfile from '../components/Profile/UpdateProfile'

function ProfilePage({ errorLoading, profile, user })
{
  const router = useRouter()

  const [showToastr, setShowToastr] = useState(false)

  const [activeItem, setActiveItem] = useState('profile')
  const handleItemClick = clickedTab => setActiveItem(clickedTab)


  const ownAccount = profile.user._id === user._id

  if(errorLoading) return <NoProfile />

  useEffect(() =>
  {
    showToastr && setTimeout(() => setShowToastr(false), 4000)
  
  }, [showToastr])

  return (
    <>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column>
            <ProfileMenuTabs activeItem={activeItem} handleItemClick={handleItemClick} ownAccount={ownAccount} />
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            {activeItem === 'profile' && (
              <>
                <ProfileHeader profile={profile} />
              </>
            )}

            {activeItem === 'updateProfile' && <UpdateProfile Profile={profile} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

ProfilePage.getInitialProps = async ctx =>
{
  try
  {
    const { username } = ctx.query
    const { token } = parseCookies(ctx)

    const res = await axios.get(`${baseUrl}/api/profile/${username}`, { headers: { Authorization: token } })

    const { profile } = res.data

    return { profile }
  }
  catch (error)
  {
    return { errorLoading: true }
  }
}

export default ProfilePage