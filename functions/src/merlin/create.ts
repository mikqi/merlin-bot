import { Message } from 'node-telegram-bot-api'
import { readUserData } from '../db/user'
import axios from 'axios'

const TYPES = ['group', 'supergroup']
const URL = 'https://teamup.com/ksba33b1dec7c75214/events'
const LEAVE_TYPES = ['remote', 'cuti', 'gh', 'sick leave']

module.exports = function (bot) {
  bot.onText(/\/buat_leave/, async (msg: Message) => {
    const chatId = msg.chat.id
    const type = msg.chat.type
    const todayDate = new Date()
    const TODAY = `${todayDate.getFullYear()}-${todayDate.getMonth().toString().length > 1 ? todayDate.getMonth() + 1 : '0' + (todayDate.getMonth() + 1)}-${todayDate.getDate().toString().length > 1 ? todayDate.getDate() : '0' + todayDate.getDate()}`

    if (TYPES.indexOf(type) >= 0) {
      return bot.sendMessage(chatId, `Japri aku aja dong @${msg.from.username} sayang biar lebih intim. 😘`)
    }

    const lastName = msg.from.last_name ? ` ${msg.from.last_name}` : ''

    const payload = {
      start_dt: '',
      end_dt: '',
      all_day: true,
      title: '',
      who: `${msg.from.first_name}${lastName} (${msg.from.username})`,
      subcalendar_id: process.env.SUB_CALENDAR_ID
    }

    const opts = {
      reply_markup: JSON.stringify({ force_reply: true }
    )};

    // tslint:disable-next-line:no-shadowed-variable
    const postData = function (payload) {
      const HEADERS = { headers: { 'Teamup-Token': process.env.API_KEY }}

      axios.post(URL, payload, HEADERS)
        .then(_ => {
          bot.sendMessage(chatId, `Yeiyyy kamu sudah menambahkan ${payload.title} untuk tanggal ${payload.start_dt} sampai ${payload.end_dt}. Take care baby. 😘`)
          bot.sendMessage(chatId, `Detail lengkap bisa cek di https://teamup.com/ksba33b1dec7c75214 ya say. 😘`)
        })
        .catch(_ => {
          bot.sendMessage(chatId, 'Aduhhh.. Kayanya ada yang salah deh 😢 Coba lagi atau bisa tanya ke bro @mikqi atau bro @gazandi yaa. 😘')
        })
    }

    await bot.sendMessage(chatId, 'Masukkan Nama event dulu dong say? (Remote, Cuti, GH, Sick Leave)', opts)
      .then( async ({message_id}) => {
        await bot.onReplyToMessage(chatId, message_id, async (responseLabel: Message) => {
          payload.title = responseLabel.text
          console.log(payload)
          if (LEAVE_TYPES.indexOf(payload.title.toLowerCase()) === -1) {
            return bot.sendMessage(chatId, 'Salah masukkin nama event say. Aku cuma bisa ngeset Remote, Cuti, GH sama Sick Leave say. 🤪')
          } else {
            payload.who = payload.title.toLowerCase() === 'remote' ? `${msg.from.first_name}${lastName} (@${msg.from.username})` : `${msg.from.first_name}${lastName} (${msg.from.username})`
          }

          await bot.sendMessage(chatId, `Mulai tanggal berapa nih? Sekarang tuh tanggal ${TODAY}. (format: YYYY-MM-DD | "hari ini aja")`, opts)
            .then( async ({message_id: messageId}) => {
              await bot.onReplyToMessage(chatId, messageId, async (responseDate: Message) => {
                const response = responseDate.text.toLowerCase()
                if (response === 'hari ini aja' || response ==='just today') {
                  payload.start_dt = TODAY
                  payload.end_dt = TODAY
                  return postData(payload)
                }
                payload.start_dt = response

                await bot.sendMessage(chatId, `Berapa lama ${payload.title}-nya say? (format: 1 - 10, sesuai jumlah cuti yang diinginkan)`, opts)
                  .then( async ({message_id: messageId}) => {
                    await bot.onReplyToMessage(chatId, messageId, async (responseEndDate: Message) => {
                      bot.sendMessage(chatId, 'Oke sebentar say, Merlin tambahin dulu ya.. 🏃🏻‍')
                      const currentDate = new Date(payload.start_dt)
                      const calculteDate = currentDate.setDate(currentDate.getDate() + Number(responseEndDate.text))
                      const endDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().length > 1 ? currentDate.getMonth() + 1 : '0' + (currentDate.getMonth() + 1)}-${(currentDate.getDate() - 1).toString().length > 1 ? currentDate.getDate() - 1 : '0' + (currentDate.getDate() - 1)}`
                      // const endDate = Number(payload.start_dt.substr(8)) + Number(responseEndDate.text)

                      // const endDateStr = endDate.toString().length === 1 ? `0${endDate}` : endDate
                      // payload.end_dt = payload.start_dt.replace(payload.start_dt.substr(8), endDate.toString())

                      payload.end_dt = endDate
                      console.log(payload)
                      postData(payload)
                    })
                  })
              })
            })
        })
      })

  })
}

// const { data, error } = await createEvent(payload, URL)

// if (TYPES.indexOf(type) >= 0 && !error)  {
//   const { events } = data
//   const listEvents = convertListEvents(events)
//   bot.sendMessage(chatId, listEvents)
//   bot.sendMessage(chatId, `versi lengkapnya bisa ceki ceki [dimari](${teamupURL[1]}) sis`, {
//     parse_mode: 'Markdown'
//   })
// } else if (error) {
//   console.log(error)
//   bot.sendMessage(chatId, JSON.stringify(error))
//   bot.sendMessage(chatId, 'Atur ulang id teamupnya dong. /atur', {
//     parse_mode: 'Markdown'
//   })
// }
