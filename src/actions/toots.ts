import axios from 'axios'
import { PostContent } from '../types'

export async function toot(status: string | PostContent, url: string, token: string) {
  if (typeof status == "string") {
    const res = await axios.post((new URL("/api/v1/statuses", url)).toString(), {
      status
    }, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    return res.data
  }
}