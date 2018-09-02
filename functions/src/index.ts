import * as express from 'express'
import * as TelegramBot from 'node-telegram-bot-api'
import botInterface from './interface';
// tslint:disable-next-line:no-duplicate-imports
import { urlTest } from './interface'

require('dotenv').config()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
})

const app = express()

app.get('/anu', (req: express.Request, res: express.Response) => {
  res.send('Mamam')
  console.log(`get`)
})

app.get('/testGet', (req: express.Request, res: express.Response) => {
  res.send(botInterface.testGet())
})

app.get('/todayEvent', (req: express.Request, res: express.Response) => {

  botInterface.getTodayEvent(urlTest).then(response => {
    res.send(response.data);
  }).catch(response =>  {
    console.log(response)
    res.send(response.error)
  })
})

app.get('/getByDate', (req: express.Request, res: express.Response) => {
  const query = req.query;
  botInterface.getByDate(urlTest, query.startDate, query.endDate).then(response => {
    res.send(response.data);
  }).catch(response => {
    console.log(response)
    res.send(response.error)
  })
})
require('./merlin/help')(bot)
require('./merlin/setting')(bot)
require('./merlin/schedule')(bot)
require('./merlin/create')(bot)
require('./merlin/snack')(bot)
require('./merlin/done')(bot)
require('./merlin/holiday')(bot)
require('./job')(bot)

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

app.listen(8888, () => {
  console.log('server listen on port 8888')
})
