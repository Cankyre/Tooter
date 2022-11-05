import axios from 'axios'
import { OauthTokenOptions, Token, Application } from '../types'

export async function getToken(options: OauthTokenOptions): Promise<Token> {
  try {
    const res = await axios.post((new URL("/oauth/token", options.url)).toString(), null, {
      params: {
        client_id: options.clientId,
        client_secret: options.clientSecret,
        redirect_uri: options.redirectURI || "urn:ietf:wg:oauth:2.0:oob",
        grant_type: "authorization_code",
        scope: options.scope || "read",
        code: options.code
      }
    })
    return res.data
  } catch {
    throw new Error("400: The provided authorization grant is invalid, expired, revoked," +
    " does not match the redirection URI used in the authorization request, or was issued to another client.")
  }
}

export async function verifyToken(token: string, url: string): Promise<Application> {
  try {
    const res = await axios.get((new URL("/api/v1/apps/verify_credentials", url)).toString(), {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    return res.data
  } catch {
    throw new Error("401: The access token is invalid.")
  }
}
