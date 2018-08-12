import { readUsers, readUserData } from './db/user'
import { getTodayEvent } from './interface'
import { convertListEvents } from './utils'
const CronJob = require('cron').CronJob

module.exports = function (bot) {
  new CronJob({
    cronTime: '00 30 11 * * 1-5',
    // cronTime: '*/5 * * * * *',
    // cronTime: '00 09 00 * * *',
    async onTick() {
      const userIds = await readUsers()
      const arrIds = Object.keys(userIds)
  
      arrIds.forEach(id => {
        sendMessage(id, bot)
      })
    },
    start: true,
    timeZone: 'Asia/Jakarta',
  })
}

const sendMessage = async function (chatId, bot) {
  const teamupURL = await readUserData(chatId)
  const { data, error } = await getTodayEvent(teamupURL[1])

  if (!error)  {
    const { events } = data
    const listEvents = convertListEvents(events)
    bot.sendMessage(chatId, listEvents)
    bot.sendMessage(chatId, `versi lengkapnya bisa ceki ceki [dimari](${teamupURL[1]}) sis`, {
      parse_mode: 'Markdown'
    })
  } else if (error) {
    bot.sendMessage(chatId, 'Atur ulang id teamupnya dong. /atur', {
      parse_mode: 'Markdown'
    })
  }
}

