import * as express from 'express'
import * as functions from 'firebase-functions';

const app = express()

app.get('/anu', (req, res) => {
  res.send('Mamam')
})

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.app = functions.https.onRequest(app);
