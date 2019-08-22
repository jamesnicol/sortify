const request = require('request-promise');
const { User } = require('../models');

const {
  REDIRECT_URI,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
} = require('../../config');

const clientAuthStr = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString('base64');

// requesting access token from refresh token
const getAccessToken = async refreshToken => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${clientAuthStr}`
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    json: true
  };

  return request
    .post(authOptions)
    .then(body => {
      return body.accessToken;
    })
    .catch(() => {
      return null;
    });
};

const callback = async code => {
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

  // @TODO: make async and return something relevant
  try {
    const tokenRes = request.post(authOptions);
    const { access_token: accessToken, refresh_token: refreshToken } = tokenRes;

    const meOptions = {
      url: 'https://api.spotify.com/v1/me',
      headers: { Authorization: `Bearer ${accessToken}` },
      json: true
    };
    const user = await request(meOptions);
    const { spotifyId } = user;
    new User({ spotifyId, accessToken, refreshToken }).save();
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getAccessToken,
  callback
};
