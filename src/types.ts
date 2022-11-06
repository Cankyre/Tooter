import { ReadStream, TimeLike } from 'fs'

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

export type Account = {
  id: string,
  username: string,
  acct: string,
  display_name: string,
  locked: boolean,
  bot: boolean,
  discoverable: boolean,
  group: boolean,
  created_at: string,
  note: string,
  url: string,
  avatar: string,
  avatar_static: string,
  header: string,
  header_static: string,
  followers_count: number,
  following_count: number,
  statuses_count: number,
  last_status_at: string,
  emojis: string[],
  fields: {
    name: string,
    value: string,
    verified_at: string | null
  }[]
}

export type Media = {
  id: string,
  url: string,
  preview_url: string,
  remote_url: string | null,
  text_url: string,
  meta: {
    original: {
      width: number,
      height: number,
      size: string,
      aspect: number
    },
    small: {
      width: number,
      height: number,
      size: string,
      aspect: number
    },
    focus: {
      x: number,
      y: number
    }
  },
  description: string,
  blurhash: string
}

export type Poll = {
  id: string,
  expires_at: string,
  expired: boolean,
  multiple: boolean,
  votes_count: number,
  voters_count: number,
  voted: boolean,
  own_votes: number[],
  options: [
    {
      title: string,
      votes_count: 1
    },
    {
      title: string,
      votes_count: 0
    }
  ],
  emojis: []
}

export type Card = {
  url: string,
  title: string,
  description: string,
  type: string,
  author_name: string,
  author_url: string,
  provider_name: string,
  provider_url: string,
  html: string,
  width: number,
  height: number,
  image: string,
  embed_url: string,
  blurhash: string
}

export type Status = {
  id: string,
  created_at: string,
  in_reply_to_id: string | null,
  in_reply_to_account_id: string | null,
  sensitive: boolean,
  spoiler_text: string,
  visibility: "public" | "unlisted" | "private" | "direct",
  language: string,
  uri: string,
  url: string,
  replies_count: number,
  reblogs_count: number,
  favourites_count: number,
  edited_at: string | null,
  favourited: boolean,
  reblogged: boolean,
  muted: boolean,
  bookmarked: boolean,
  pinned: boolean,
  content: string,
  reblog: string | null,
  application: Application,
  account: Account,
  media_attachments: Media[],
  mentions: string[],
  tags: string[],
  emojis: string[],
  card: null,
  poll: Poll | null
}

export type ScheduledStatus = {
  id: string,
  scheduled_at: string,
  params: {
    text: string,
    media_ids: [],
    sensitive: false,
    spoiler_text: false,
    visibility: "public" | "unlisted" | "private" | "direct",
    language: string,
    scheduled_at: string | null,
    poll: Poll | null,
    idempotency: string | null,
    with_rate_limit: boolean,
    in_reply_to_id: string | null,
    application_id: number
  },
  media_attachments: Media[]
}

export type UploadOptions = {
  fileName: string,
  thumbnail?: {
    name: string,
    value: Buffer | ReadStream
  }
  focus?: {
    x: number,
    y: number
  },
  description?: string
}