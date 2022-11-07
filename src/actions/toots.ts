import axios from 'axios'
import { PostContent, ScheduledStatus, Status, UploadOptions, Context } from '../types'
import FormData from 'form-data'
import { ReadStream } from 'fs'

export async function toot(status: string | PostContent, url: string, token: string): Promise<Status|ScheduledStatus> {
  if (typeof status == "string") {
    const res = await axios.post((new URL("/api/v1/statuses", url)).toString(), {
      status
    }, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    return res.data
  } else {
    if (status.poll) {
      const res = await axios.post((new URL("/api/v1/statuses", url)).toString(), {
        status: status.status,
        media_ids: status.mediaIDs || [],
        poll: {
          options: status.poll.options,
          expires_in: status.poll.expiresIn,
          multiple: status.poll.multiple,
          hide_totals: status.poll.hideTotals
        },
        in_reply_to_id: status.inReplyTo,
        sensitive: status.sensitive || false,
        spoiler_text: status.spoiler || false,
        visibility: status.visibility || "public",
        scheduled_at: status.scheduled?.toISOString() || "",
        language: status.language || "EN"
      }, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      return res.data
    } else {
      const res = await axios.post((new URL("/api/v1/statuses", url)).toString(), {
        status: status.status,
        media_ids: status.mediaIDs || [],
        in_reply_to_id: status.inReplyTo,
        sensitive: status.sensitive || false,
        spoiler_text: status.spoiler || false,
        visibility: status.visibility || "public",
        scheduled_at: status.scheduled?.toISOString(),
        language: status.language || "EN"
      }, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      return res.data
    }
  }
}

export async function upload(file:Buffer|ReadStream, options: UploadOptions, url: string, token: string) {
    let form = new FormData()
    form.append("file", file, options.fileName)
    if (options.thumbnail) {
      form.append("thumbnail", options.thumbnail.value, options.thumbnail.name)
    }
    if (options.focus) {
      form.append("focus", `(${
        options.focus.x
      },${
        options.focus.y
      })`)
    }
    const res = await axios.post((new URL("/api/v1/media", url)).toString(), form, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    return res.data
}

export async function tootAction(endpoint: string, id: string, url: string, token: string): Promise<Status> {
  const res = await axios.post((new URL("/api/v1/statuses/"+id+"/"+endpoint, url)).toString(), null, {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  return res.data
}

export async function _delete(id: string, url: string, token: string): Promise<Status> {
  const res = await axios.delete((new URL("/api/v1/statuses/"+id, url)).toString(), {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  return res.data
}

export async function get(id: string, url: string, token: string): Promise<Status> {
  const res = await axios.get((new URL("/api/v1/statuses/"+id, url)).toString(), {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  return res.data
}

export async function fetchAction(endpoint: string, id: string, url: string, token: string): Promise<any> {
  const res = await axios.get((new URL("/api/v1/statuses/"+id+"/"+endpoint, url)).toString(), {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  return res.data
}