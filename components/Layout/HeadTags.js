import Head from 'next/head'

const HeadTags = () =>
(
  <>
    <Head>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta charSet='UTF-8' />
      <link rel='icon' href='/favicon.png' sizes='16*16' type='image/png' />

      <link rel='stylesheet' type='text/css' href='/listMessages.css' />

      <link rel='stylesheet' type='text/css' href='/styles.css' />
      <link rel='stylesheet' type='text/css' href='/nprogress.css' />

      <title>Personal Chat App</title>
    </Head>
  </>
)

export default HeadTags