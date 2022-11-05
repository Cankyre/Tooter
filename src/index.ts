import axios from 'axios'
import { ClientOptions, Application, PostContent } from './types'
import { getToken, verifyToken } from './actions/oauth'

export class Tooter {
  url: string
  token: string

  constructor (options: ClientOptions) {
    this.url = options.url
    this.token = options.token
  }

  async verifyToken(): Promise<Application> { return await verifyToken(this.token, this.url)}

  async toot(status: string | PostContent) {
    if (typeof status == "string") {
      const res = await axios.post((new URL("/api/v1/statuses", this.url)).toString(), {
        status
      }, {
        headers: {
          "Authorization": "Bearer " + this.token
        }
      })
      return res.data
    }
  }
}

export { getToken }