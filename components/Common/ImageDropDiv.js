import React from 'react'
import { Form, Segment, Image, Icon, Header } from 'semantic-ui-react'
import { useRouter } from 'next/router'


function ImageDropDiv({highlighted, setHighlighted, inputRef, handleChange, mediaPreview, setMediaPreview, setMedia, profilePicUrl })
{
  const router = useRouter()

  const signupRoute = router.pathname === '/signup'


  const checkForSignupPage = () =>
    signupRoute ? (
      <>
        <Header icon>
          <Icon
            name='file image outline'
            style={{ cursor: 'pointer' }}
            onClick={() => inputRef.current.click()}
            size='huge'
          />
          Drag n Drop or Click to upload image
        </Header>
      </>
    ) : (
      <span style={{ textAlign: 'center' }}>
        <Image
          src={profilePicUrl}
          alt='Profile pic'
          style={{ cursor: 'pointer' }}
          onClick={() => inputRef.current.click()}
          size='medium'
          centered
        />
        Drag n Drop or Click to upload image
      </span>
    )


  return (
    <>
      <Form.Field>
        <Segment placeholder basic secondary>
          <input
            style={{ display: 'none' }}
            type='file'
            accept='image/*'
            onChange={handleChange}
            name='media'
            ref={inputRef}
          />

          <div
            onDragOver={e =>
                        {
                          e.preventDefault()
                          setHighlighted(true)
                        }}
            onDragLeave={e =>
                         {
                           e.preventDefault()
                           setHighlighted(false)
                         }}
            onDrop={e =>
                    {
                      e.preventDefault()
                      setHighlighted(true)

                      const droppedFile = Array.from(e.dataTransfer.files)
                      setMedia(droppedFile[0])
                      setMediaPreview(URL.createObjectURL(droppedFile[0]))
                    }}
          >
            {mediaPreview === null ? (
              <>
                <Segment color={highlighted ? 'green' : 'grey'} placeholder basic>
                  {checkForSignupPage()}
                </Segment>
              </>
            ) : (
              <Segment color='green' placeholder basic>
                <Image
                  src={mediaPreview}
                  size='medium'
                  centered
                  style={{ cursor: 'pointer' }}
                  onClick={() => inputRef.current.click()}
                />
              </Segment>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  )
}

export default ImageDropDiv