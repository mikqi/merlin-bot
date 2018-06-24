import * as express from 'express'
import * as functions from 'firebase-functions';
import { database } from 'firebase-admin';
import * as TelegramBot from 'node-telegram-bot-api'

require('dotenv').config()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
})

const app = express()

app.get('/anu', (req, res) => {
  res.send('Mamam')
})

require('./merlin/help')(bot)
require('./merlin/setting')(bot)

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.app = functions.https.onRequest(app);
