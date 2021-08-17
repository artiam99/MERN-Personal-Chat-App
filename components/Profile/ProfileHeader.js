import React from 'react'
import { Segment, Image, Grid, Header } from 'semantic-ui-react'


function ProfileHeader({ profile })
{
  return (
    <>
      <Segment>
        <Grid stackable>
          <Grid.Column width={11}>
            <Grid.Row>
              <Header
                as='h2'
                content={profile.user.name}
                style={{ marginTop: '120px',  marginLeft: '20px', fontSize: '50px' }}
              />
            </Grid.Row>

          </Grid.Column>

          <Grid.Column width={5} stretched style={{ textAlign: 'center' }}>
            <Grid.Row>
              <Image size='medium' avatar src={profile.user.profilePicUrl} />
            </Grid.Row>
            <br />

          </Grid.Column>
        </Grid>
      </Segment>
    </>
  )
}

export default ProfileHeader