/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const request = require('request');
const querystring = require('querystring');
const { User } = require('../models');

const { generateRandomString } = require('../util');
const {
  REDIRECT_URI,
  COOKIE_STATE_KEY,
  SPOTIFY_SCOPE,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
} = require('../../config');

const clientAuthStr = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString('base64');

const login = (req, res) => {
  const state = generateRandomString(16);
  res.cookie(COOKIE_STATE_KEY, state);

  const user = new User({});
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

const callback = (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[COOKIE_STATE_KEY] : null;

  res.clearCookie(COOKIE_STATE_KEY);

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization: `Basic ${clientAuthStr}`
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token, refresh_token } = body;
      // @TODO: store in user
      // const options = {
      //   url: 'https://api.spotify.com/v1/me',
      //   headers: { Authorization: `Bearer ${access_token}` },
      //   json: true
      // };
      // // use the access token to access the Spotify Web API
      // request.get(options, (error, response, body) => {
      //   console.log(body);
      // });
    } else {
      res.redirect(
        `/#${querystring.stringify({
          error: 'invalid_token'
        })}`
      );
    }
  });
};

const refreshToken = (req, res) => {
  // requesting access token from refresh token
  const { refresh_token: token } = req.query;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic }`
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
};

module.exports = {
  login,
  callback,
  refreshToken
};
