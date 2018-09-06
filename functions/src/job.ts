import { readUsers, readUserData } from './db/user'
import { getTodayEvent } from './interface'
import { convertListEvents, humanizeTodayDate } from './utils'
import { PPLS } from './ppl-utils'
const CronJob = require('cron').CronJob

module.exports = function (bot) {
  const LEAVE = new CronJob({
    cronTime: '00 30 11 * * 1-5',
    // cronTime: '*/5 * * * * *',
    // cronTime: '00 55 01 * * *',
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

  const SNACK = new CronJob({
    cronTime: '30 30 11 * * 1-5',
    // cronTime: '*/5 * * * * *',
    // cronTime: '00 56 01 * * *',
    async onTick() {
      const userIds = await readUsers()
      const arrIds = Object.keys(userIds)
  
      arrIds.forEach(id => {
        piket(id, bot)
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

const piket = async function (chatId, bot) {
  const DAY = DATES.getDay() - 1
  const DATES = new Date()
  const START = new Date(2018, 0, 0)
  const DIFF = (DATES - START) + ((START.getTimezoneOffset() - DATES.getTimezoneOffset()) * 60 * 1000)
  const ONEDAY = 1000 * 60 * 60 * 24;
  const DATE = Math.floor(DIFF / ONEDAY);
  const PPL_VERSION = DATE % 2 !== 0 ? '1' : '2'

  const GROUP_PPL = PPLS[DAY][PPL_VERSION].join('\n')
  await bot.sendMessage(chatId, 'Oi oiii. Jangan lupa yang piket beli snack buat hari ini ya om tante. Ini demi kebersmaan umat ya sayy...😘🤤')
  await bot.sendMessage(chatId, `
# ${humanizeTodayDate()}

${GROUP_PPL}
    `)
}

