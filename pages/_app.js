import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { parseCookies, destroyCookie } from 'nookies'
import baseUrl from '../utils/baseUrl'
import { redirectUser } from '../utils/authUser'
import { Footer } from '../components/Common/FooterMessage'
import Layout from '../components/Layout/Layout'
import { Divider } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css'
import 'semantic-ui-css/semantic.min.css'

function MyApp ({ Component, pageProps })
{
  const { asPath } = useRouter()

  useEffect(() =>
  {
    async function Scroll()
    {

      setTimeout(() =>
      {
        window.scrollTo(0, 0)

      }, 500)
    }

    Scroll()
  
  }, [asPath])


  return (
    <>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>

        <Divider hidden /><Divider hidden /><Divider hidden /><Divider hidden /><Divider hidden />
        
        <Footer />
    </>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) =>
{
  const { token } = parseCookies(ctx)
  let pageProps = {}

  const protectedRoutes = ctx.pathname === '/[username]' || ctx.pathname === '/messages'

  const indexRoute = ctx.pathname === '/'
  

  if(!token)
  {
    destroyCookie(ctx, 'token')

    const login = protectedRoutes || indexRoute
    
    login && redirectUser(ctx, '/login')
  }
  else
  {
    if(Component.getInitialProps)
    {
      pageProps = await Component.getInitialProps(ctx)
    }

    try
    {
      const res = await axios.get(`${baseUrl}/api/auth`, { headers: { Authorization: token } })

      const { user } = res.data

      if(user) !protectedRoutes && redirectUser(ctx, '/messages')

      pageProps.user = user
    }
    catch(error)
    {
      destroyCookie(ctx, 'token')
      redirectUser(ctx, '/login')
    }
  }

  return { pageProps }
}

export default MyApp