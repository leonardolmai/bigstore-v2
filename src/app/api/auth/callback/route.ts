import { api } from '@/utils/api'
import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const accessTokenResponse = await axios.post(
    'https://accounts.google.com/o/oauth2/token',
    null,
    {
      params: {
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        grant_type: 'authorization_code',
      },
    },
  )

  // eslint-disable-next-line camelcase
  const { access_token } = accessTokenResponse.data

  const userInfoResponse = await axios.get(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        // eslint-disable-next-line camelcase
        Authorization: `Bearer ${access_token}`,
      },
    },
  )

  let response
  try {
    response = await api.post('/auth-token/', {
      username: userInfoResponse.data.email,
      password:
        userInfoResponse.data.sub.slice(0, 12) + process.env.PASSWORD_SALT,
    })
  } catch (error: Error | AxiosError) {
    const createUserResponse = await api.post('/users/', {
      email: userInfoResponse.data.email,
      password:
        userInfoResponse.data.sub.slice(0, 12) + process.env.PASSWORD_SALT,
    })
    response = await api.post('/auth-token/', {
      username: userInfoResponse.data.email,
      password:
        userInfoResponse.data.sub.slice(0, 12) + process.env.PASSWORD_SALT,
    })
  }

  const { token } = response.data

  const {
    data: { type },
  } = await api.get('/users/type/', {
    headers: { Authorization: `Token ${token}` },
  })

  const redirectURL = new URL('/', request.url)
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': [
        `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
        `typeUser=${type}; Path=/; max-age=${cookieExpiresInSeconds};`,
      ].join(', '),
    },
  })
}
