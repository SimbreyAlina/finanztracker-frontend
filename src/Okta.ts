import { OktaAuth } from '@okta/okta-auth-js'
import OktaSignIn from '@okta/okta-signin-widget'

const OKTA_DOMAIN = 'https://integrator-6321342.okta.com'
const CLIENT_ID = '0oa14mk5p7xHi7XnC698' // <-- aus Okta: Applications → deine App → General → Client ID
const ISSUER = `${OKTA_DOMAIN}/oauth2/default`

export const oktaSignIn = new OktaSignIn({
  baseUrl: OKTA_DOMAIN,
  clientId: CLIENT_ID,
  redirectUri: window.location.origin + '/login/callback',
  authParams: {
    pkce: true,
    issuer: ISSUER,
    display: 'page',
    scopes: ['openid', 'profile', 'email'],
  },
  features: { registration: true },
  useInteractionCodeFlow: false,
  useClassicEngine: true,
})

export const oktaAuth = new OktaAuth({
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
})
