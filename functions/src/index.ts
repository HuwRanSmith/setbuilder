import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
});

const SpotifyWebApi = require('spotify-web-api-node');
const Spotify = new SpotifyWebApi({
  clientId: functions.config().spotify.client_id,
  clientSecret: functions.config().spotify.client_secret,
  redirectUri: `http://localhost:4200/login`,
  //redirectUri: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/login`,
});

const OAUTH_SCOPES = ['user-read-email', 'streaming', 'user-read-private'];

exports.redirect = functions
  .region('europe-west2')
  .https.onCall((data, context) => {
    const authorizeURL = Spotify.createAuthorizeURL(OAUTH_SCOPES, '', true);
    return { authorizeURL: authorizeURL };
  });

exports.token = functions
  .region('europe-west2')
  .https.onCall(async (data, context) => {
    const response = await Spotify.authorizationCodeGrant(data.code);
    Spotify.setAccessToken(response.body['access_token']);
    const userResults = await Spotify.getMe();
    const accessToken = response.body['access_token'];
    const spotifyUserID = userResults.body['id'];
    const profilePic = userResults.body['images'][0]['url'];
    const userName = userResults.body['display_name'];
    const email = userResults.body['email'];
    const firebaseToken = await createFirebaseAccount(
      spotifyUserID,
      userName,
      profilePic,
      email,
      accessToken
    );
    console.log(firebaseToken);
    return { firebaseToken: firebaseToken };
  });

/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 * Also saves the accessToken to the datastore at /spotifyAccessToken/$uid
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
async function createFirebaseAccount(
  spotifyID: string,
  displayName: string,
  photoURL: string,
  email: string,
  accessToken: string
) {
  // The UID we'll assign to the user.
  const uid = `spotify:${spotifyID}`;

  // Save the access token to the Firebase Realtime Database.
  const databaseTask = admin.firestore().collection('users').doc(uid).set({
    spotifyAccessToken: accessToken,
  });

  // Create or update the user account.
  const userCreationTask = admin
    .auth()
    .updateUser(uid, {
      displayName: displayName,
      photoURL: photoURL,
      email: email,
      emailVerified: true,
    })
    .catch((error) => {
      // If user does not exists we create it.
      if (error.code === 'auth/user-not-found') {
        return admin.auth().createUser({
          uid: uid,
          displayName: displayName,
          photoURL: photoURL,
          email: email,
          emailVerified: true,
        });
      }
      throw error;
    });

  // Wait for all async tasks to complete, then generate and return a custom auth token.
  await Promise.all([userCreationTask, databaseTask]);
  // Create a Firebase custom auth token.
  const token = await admin.auth().createCustomToken(uid);
  functions.logger.log(
    'Created Custom token for UID "',
    uid,
    '" Token:',
    token
  );
  return token;
}
