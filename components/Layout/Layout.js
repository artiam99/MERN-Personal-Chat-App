import React, { createRef } from 'react'
import HeadTags from './HeadTags'
import Navbar from './Navbar'
import { Container, Visibility, Grid, Sticky, Ref} from 'semantic-ui-react'
import nprogress from 'nprogress'
import Router, { useRouter } from 'next/router'
import SideMenu from './SideMenu'
import MobileHeader from './MobileHeader'
import { createMedia } from '@artsy/fresnel'


const AppMedia = createMedia({ breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 } })

const mediaStyles = AppMedia.createMediaStyle()
const { Media, MediaContextProvider } = AppMedia

function Layout({ children, user })
{
  const contextRef = createRef()

  Router.onRouteChangeStart = () => nprogress.start()
  Router.onRouteChangeComplete = () => nprogress.done()
  Router.onRouteChangeError = () => nprogress.done()

  return (
    <>
      <HeadTags />
      {user ? (
        <>
          <style>{mediaStyles}</style>

          <MediaContextProvider>
            <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
              <Media greaterThanOrEqual='computer'>
                <Ref innerRef={contextRef}>
                  <Grid>
                    {(
                      <>
                        <Grid.Column floated='left' width={2}>
                          <Sticky context={contextRef}>
                            <SideMenu user={user} pc />
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={13}>
                          <Visibility context={contextRef}>{children}</Visibility>
                        </Grid.Column>

                        {(
                            <Grid.Column floated='left' width={1}>
                              <Sticky context={contextRef}>
                                <div></div>
                              </Sticky>
                            </Grid.Column>
                          )
                        }
                        
                      </>
                    )}
                  </Grid>
                </Ref>
              </Media>

              <Media between={['tablet', 'computer']}>
                <Ref innerRef={contextRef}>
                  <Grid>
                    {(
                      <>
                        <Grid.Column floated='left' width={2}>
                          <Sticky context={contextRef}>
                            <SideMenu user={user} pc={false} />
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={13}>
                          <Visibility context={contextRef}>{children}</Visibility>
                        </Grid.Column>
                      </>
                    )}
                  </Grid>
                </Ref>
              </Media>

              <Media between={['mobile', 'tablet']}>
                <Ref innerRef={contextRef}>
                  <Grid>
                    {(
                      <>
                        <Grid.Column floated='left' width={2}>
                          <Sticky context={contextRef}>
                            <SideMenu user={user} pc={false} />
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={14}>
                          <Visibility context={contextRef}>{children}</Visibility>
                        </Grid.Column>
                      </>
                    )}
                  </Grid>
                </Ref>
              </Media>

              <Media between={['zero', 'mobile']}>
                <MobileHeader user={user} />
                <Grid>
                  <Grid.Column>{children}</Grid.Column>
                </Grid>
              </Media>
            </div>
          </MediaContextProvider>
        </>
      ) : (
        <>
          <Navbar />
          <Container text style={{ paddingTop: '1rem' }}>
            {children}
          </Container>
        </>
      )}
    </>
  )
}

export default Layout