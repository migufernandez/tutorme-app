import auth0 from 'auth0-js'
import history from '../history'

export default function() {
  const auth = new auth0.WebAuth({
    domain: 'migufernandez.auth0.com',
    clientID: 'Ew4K44PovsW9c9ZLzsPJS8cX3py3r0OS',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://migufernandez.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  })

  return {
    login,
    logout,
    isAuthenticated,
    handleAuthentication
  }
  function handleAuthentication() {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult)
        history.replace('/')
      } else if (err) {
        history.replace('/')
        console.log(err)
      }
    })
  }

  function setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    // navigate to the home route
    history.replace('/')
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  function login() {
    auth.authorize()
  }

  function logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // navigate to the home route
    history.replace('/')
  }
}
