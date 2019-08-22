/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const querystring = require('querystring');
const spotify = require('../services/spotify');

const { generateRandomString } = require('../util');
const {
  REDIRECT_URI,
  COOKIE_STATE_KEY,
  SPOTIFY_SCOPE,
  SPOTIFY_CLIENT_ID
} = require('../../config');

const login = (req, res) => {
  const state = generateRandomString(16);
  res.cookie(COOKIE_STATE_KEY, state);

  // your application requests authorization
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: SPOTIFY_SCOPE,
      redirect_uri: REDIRECT_URI,
      state
    })}`
  );
};

const callback = async (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[COOKIE_STATE_KEY] : null;
  if (state === null || state !== storedState) {
    res.redirect(
      `/#${querystring.stringify({
        error: 'state_mismatch'
      })}`
    );
  } else {
    const code = req.query.code || null;
    res.clearCookie(COOKIE_STATE_KEY);
    const isAuth = await spotify.callback(code);
    if (!isAuth) {
      res.redirect(
        `/#${querystring.stringify({
          error: 'invalid_token'
        })}`
      );
    }
    res.json({});
  }
};

module.exports = {
  login,
  callback
};
