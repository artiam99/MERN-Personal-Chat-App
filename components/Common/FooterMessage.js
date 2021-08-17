import { Icon, Message, Divider, Grid } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const FooterMessage = () =>
{
  const router = useRouter()
  const signupRoute = router.pathname === '/signup'

  return (
    <>
      {signupRoute ? (
        <>
          <Message attached='bottom' warning>
            <Icon name='help' />
            Existing User? <Link href='/login'>Login Here Instead</Link>
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          <Divider hidden />

          <Message attached='bottom' warning>
            <Icon name='help' />
            New User? <Link href='/signup'>Signup Here</Link> Instead{' '}
          </Message>
        </>
      )}
    </>
  )
}

export const Footer = () =>
{
    return (
        <footer>
            <div style={{ width: '100%', textAlign: 'center', fontSize: '18px' }}>
              <strong>Built by Debarshi Maitra (2021)</strong>
            </div>
            
            <br />
            
            <div style={{ width: '100%', textAlign: 'center', fontSize: '18px' }}>
              <strong>Email - tuhin.dm1999@gmail.com</strong>        
            </div>
            <br />
            
            <div style={{ width: '100%', textAlign: 'center', fontSize: '18px' }}>
              <strong><a href='https://github.com/artiam99' target='blank' style={{color: 'black'}}>Github</a></strong>
            </div>
            <br />
            
            <div style={{ width: '100%', textAlign: 'center', fontSize: '18px' }}>
              <strong>
                <a href='https://www.linkedin.com/in/debarshi-maitra-994932213/' target='blank' style={{color: 'black'}}>Linkedin</a>
              </strong>
            </div>
            <br />
        </footer>
    )
}