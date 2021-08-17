import React, { useState, useEffect } from 'react'
import { List, Image, Search } from 'semantic-ui-react'
import axios from 'axios'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import baseUrl from '../../utils/baseUrl'

let cancel

function ChatListSearch({ chats, setChats, user })
{
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const router = useRouter()


  const handleChange = async e =>
  {
    const { value } = e.target

    setText(value)
    setLoading(true)


    if(value.length === 0)
    return setText(value)

    if(value.trim().length === 0)
    return

    try
    {
      cancel && cancel()
      const CancelToken = axios.CancelToken
      const token = cookie.get('token')

      const res = await axios.get(`${baseUrl}/api/search/${value}`,
      {
        headers: { Authorization: token },
        cancelToken: new CancelToken(canceler => cancel = canceler)
      })

      if(res.data.length === 0)
      {
        results.length > 0 && setResults([])

        return setLoading(false)
      }

       const result = res.data.filter((data) =>
                                      {
                                        if(data.username !== user.username)
                                        return true

                                        return false
                                      })

      setResults(result)

    }
    catch(error)
    {
      alert('Error Searching')
    }

    setLoading(false)
  }


  const addChat = result =>
  {
    let flag = false

    chats.filter(chat =>
    {
      if(chat.messagesWith.toString() === result._id.toString())
      flag = true
    })

    const alreadyInChat = flag

    if(alreadyInChat)
    {
      return router.push(`/messages?message=${result._id}`)
    }
    else
    {
      const newChat = {
                        messagesWith: result._id,
                        name: result.name,
                        profilePicUrl: result.profilePicUrl,
                        lastMessage: '',
                        date: Date.now()
                      }

      setChats(prev => [newChat, ...prev])

      return router.push(`/messages?message=${result._id}`)
    }
  }


  useEffect(() =>
  {
    if(text.length === 0 && loading)
    setLoading(false)

  }, [text])


  return (
    <Search
      onBlur={() =>
              {
                results.length > 0 && setResults([])
                loading && setLoading(false)
                setText('')
              }}
      loading={loading}
      value={text}
      resultRenderer={ResultRenderer}
      results={results}
      onSearchChange={handleChange}
      minCharacters={1}
      onResultSelect={(e, data) => addChat(data.result)}
    />
  )
}

const ResultRenderer = ({ _id, profilePicUrl, name }) =>
{
  return (
    <List key={_id}>
      <List.Item>
        <Image src={profilePicUrl} alt='ProfilePic' avatar />
        <List.Content header={name} as='a' />
      </List.Item>
    </List>
  )
}

export default ChatListSearch