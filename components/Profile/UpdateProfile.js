import React, { useState, useRef } from 'react'
import { Form, Button, Message, Divider } from 'semantic-ui-react'
import ImageDropDiv from '../Common/ImageDropDiv'
import uploadPic from '../../utils/uploadPicToCloudinary'
import { profileUpdate } from '../../utils/profileActions'


function UpdateProfile({ Profile })
{
  const [profile, setProfile] = useState({ profilePicUrl: Profile.user.profilePicUrl })

  const [errorMsg, setErrorMsg] = useState(null)

  const [loading, setLoading] = useState(false)

  const [highlighted, setHighlighted] = useState(false)
  const inputRef = useRef()
  const [media, setMedia] = useState(null)
  const [mediaPreview, setMediaPreview] = useState(null)


  const handleChange = e =>
  {
    const { name, value, files } = e.target

    if(name === 'media')
    {
      setMedia(files[0])
      setMediaPreview(URL.createObjectURL(files[0]))
    }
    
    setProfile(prev => ({ ...prev, [name]: value }))
  }
  

  return (
    <>
      <Form
        error={errorMsg !== null}
        loading={loading}
        onSubmit={async e => {
          e.preventDefault()
          setLoading(true)

          let profilePicUrl

          if(media !== null)
          {
            profilePicUrl = await uploadPic(media)
          }

          if(media !== null && !profilePicUrl)
          {
            setLoading(false)
            return setErrorMsg('Error Uploading Image')
          }

          await profileUpdate(setLoading, setErrorMsg, profilePicUrl)
        }}
      >
        <Message
          onDismiss={() => setErrorMsg(false)}
          error
          content={errorMsg}
          attached
          header='Oops!'
        />

        <ImageDropDiv
          inputRef={inputRef}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          handleChange={handleChange}
          mediaPreview={mediaPreview}
          setMediaPreview={setMediaPreview}
          setMedia={setMedia}
          profilePicUrl={profile.profilePicUrl}
        />


        <Divider hidden />

        <Button
          color='blue'
          icon='pencil alternate'
          disabled={loading}
          content='Submit'
          type='submit'
        />
      </Form>
    </>
  )
}

export default UpdateProfile