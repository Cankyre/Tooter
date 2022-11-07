# Tooter
A bot-making API for [Mastodon](https://mstdn.social)

* **Important notice: Please follow your server rules. Tooter and Cankyre are not responsible for any product misuse or any misconduct**
* Note: This version is a very first preview of what the module may become, this is very limited in features for now but will increase over time

## How to use:
You need a Mastodon app and user token. Please go on the [Mastodon API docs](https://docs.joinmastodon.org/client/authorized/) in order to get one. You will need to store your token **SECURELY**, in our exemple we use [dotenv](https://www.npmjs.com/package/dotenv)

### Example code:
```js
/**
 * Tooter example file, you need to install Tooter and dotenv (for token storage)
 * "npm i tooter dotenv" Then store your token in your .env
 * 
 * Feel free to ask @Cankyre@toot.community on mastodon or @Cankyre#5361 on Discord for more help.
 */

const { Tooter } = require("tooter")
require("dotenv").config()

async function main(token) {
  // Initialize client
  let bot = new Tooter({
    url: "https://botsin.space",
    token: token,
  })
  
  // Check if our token is valid
  await bot.verifyToken()

  // Post/Delete status
  const toot = await bot.toot("Example status") // Toots a new status (Handles polls and media) 
  bot.delete(toot.id)

  // Media content from file / buffer
  const { createReadStream } = require("fs")
  let media = createReadStream("sample.png") // sample data - Buffer also works if giving filename
  const media_up = await bot.upload(media) // Warning: more ingos needed if giving a buffer (see type UploadOptions)
  bot.toot({
    mediaIDs: [media_up.id]
  })

  // User actions:
  bot.fav("<id>")
  bot.unfav("<id>")
  bot.boost("<id>")
  bot.unboost("<id>")
  bot.bookmark("<id>")
  bot.unbookmark("<id>")
  bot.pin("<id>")
  bot.unpin("<id>")
  bot.mute("<id>")
  bot.unmute("<id>")

  // Fetch actions
  bot.toots.get("<id>") // Get specific status
  bot.toots.getContext("<id>") // Get statuses' following and predecessor statuses
  bot.toots.getFavs("<id>") // Get accounts that have fav'd the status
  bot.toots.getBoosts("<id>") // Get accounts that have boosted the status
}
  
main(process.env.TOKEN)
```
More infos are available on the [types declaration](https://github.com/Cankyre/Tooter/blob/main/src/types.ts) and on the [mastodon API documentation](https://docs.joinmastodon.org/client/authorized/) (Both work in similar ways)