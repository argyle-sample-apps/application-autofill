import { deleteCookie } from 'cookies-next'

type AuthOpts = {
  headers?: { [id: string]: string }
}

export const getAuthOpts = (params?: AuthOpts) => {
  const authString =
    process.env.ARGYLE_API_KEY + ':' + process.env.ARGYLE_API_SECRET

  const authToken = Buffer.from(authString).toString('base64')

  const options = {
    headers: {
      'Authorization': 'Basic ' + authToken,
      'Content-Type': 'application/json',
      ...params?.headers,
    },
  }
  return options
}

export const clearCookies = () => {
  const cookies = [
    'argyle-x-user-token',
    'argyle-x-user-id',
    'argyle-x-link-item',
  ]
  cookies.forEach((cookie) => deleteCookie(cookie))
}
