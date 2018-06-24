// Set the configuration for your app
// TODO: Replace with your project's config object
const firebase = require("firebase-admin");
import * as functions from 'firebase-functions';

const firebaseApp = firebase.initializeApp(functions.config().functions);

export const db = firebaseApp.database()