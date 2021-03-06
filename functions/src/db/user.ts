
import { db } from './config';

export const writeUserData = (telegramId, teamupId, teamupLink) => {
  db.ref('users/' + telegramId).set({
    teamupId: teamupId,
    teamupLink : teamupLink
  });
}

export const readUserData = (userId) => {
  return new Promise ((resolve, reject) => {
    db.ref('/users/' + userId).once('value').then(function(snapshot) {
      const teamupLink = (snapshot.val() && snapshot.val().teamupLink) || 'Anonymous'
      const teamupId = (snapshot.val() && snapshot.val().teamupId) || 'Anonymous'
      resolve([teamupId, teamupLink]);
    });
  })
}

export const readUsers = () => {
  return new Promise(resolve => {
    db.ref('/users/').once('value')
      .then(snapshot => {
        resolve(snapshot.val())
      })
  })
}

 