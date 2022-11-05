import { TimeLike } from 'fs'

export type ClientOptions = {
  token: string,
  url: string,
}

export type Application = {
  name: string,
  website: string | null
  vapid_key: string | null
}

export type Token = {
  access_token: string,
  token_type: string,
  scope: string,
  created_at: TimeLike
}

export type OauthTokenOptions = {
  url: string,
  clientId: string,
  clientSecret: string,
  redirectURI?: string,
  scope?: string,
  code: string
}

export type PostContent = {
  status: string,
  mediaIDs?: (number | string)[],
  poll?: {
    options: string[],
    expiresIn: number,
    multiple?: boolean,
    hideTotals?: boolean,
  }
  inReplyTo?: string,
  sensitive?: boolean,
  spoiler?: boolean,
  visibility?: "public" | "unlisted" | "private" | "direct",
  scheduled?: Date,
  language?: String
}