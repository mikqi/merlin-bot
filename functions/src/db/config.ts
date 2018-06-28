// Set the configuration for your app
// TODO: Replace with your project's config object
import * as firebase from 'firebase-admin'
const serviceAccount = require('../../merlin.json');

const config = {
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://merlin-bot.firebaseio.com',
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database()