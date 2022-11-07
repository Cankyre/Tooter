import { ClientOptions, Application, PostContent, UploadOptions, Status, ScheduledStatus, Context, Account, Media } from './types'
import { getToken, verifyToken } from './actions/oauth'
import { toot, upload, tootAction, fetchAction, _delete, get } from './actions/toots'
import { ReadStream } from 'fs'

export class Tooter {
  url: string
  token: string
  toots: TootsFetcher

  constructor (options: ClientOptions) {
    this.url = options.url
    this.token = options.token
    this.toots = new TootsFetcher(options.url, options.token)
  }

  async verifyToken(): Promise<Application> { return await verifyToken(this.token, this.url)}

  // Statuses
  async toot(status: string | PostContent): Promise<Status|ScheduledStatus> { return await toot(status, this.url, this.token)}
  async upload(file: Buffer | ReadStream, options: UploadOptions): Promise<Media> {return await upload(file, options, this.url, this.token)}
  async delete(id:string): Promise<Status> {return await _delete(id, this.url, this.token)}

  // Actions

  async fav(id:string): Promise<Status> {return await tootAction("favourite", id, this.url, this.token)}
  async unfav(id:string): Promise<Status> {return await tootAction("unfavourite", id, this.url, this.token)}

  async boost(id:string): Promise<Status> {return await tootAction("reblog", id, this.url, this.token)}
  async unboost(id:string): Promise<Status> {return await tootAction("unreblog", id, this.url, this.token)}

  async bookmark(id:string): Promise<Status> {return await tootAction("bookmark", id, this.url, this.token)}
  async unbookmark(id:string): Promise<Status> {return await tootAction("unbookmark", id, this.url, this.token)}

  async mute(id:string): Promise<Status> {return await tootAction("mute", id, this.url, this.token)}
  async unmute(id:string): Promise<Status> {return await tootAction("unmute", id, this.url, this.token)}

  async pin(id:string): Promise<Status> {return await tootAction("pin", id, this.url, this.token)}
  async unpin(id:string): Promise<Status> {return await tootAction("unpin", id, this.url, this.token)}
}

export class TootsFetcher {
  url: string
  token: string

  constructor(url: string, token: string) {
    this.url = url
    this.token = token
  }

  // Fetch statuses
  async get(id:string): Promise<Status> {return await get(id, this.url, this.token)}
  async getContext(id:string): Promise<Context> {return await fetchAction("context", id, this.url, this.token)}

  // Specific statuses infos
  async getBoosts(id:string): Promise<Account[]> {return await fetchAction("reblogged_by", id, this.url, this.token)}
  async getFavs(id:string): Promise<Account[]> {return await fetchAction("favourited_by", id, this.url, this.token)}
}

export { getToken }