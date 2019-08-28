const request = require('request-promise');
const { User } = require('../models');

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('../../config');

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

const callback = async (code, redirectUri) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization: `Basic ${clientAuthStr}`
    },
    json: true
  };

  // @TODO: make async and return something relevant
  try {
    const tokenRes = await request.post(authOptions);
    const { access_token: accessToken, refresh_token: refreshToken } = tokenRes;

    const meOptions = {
      url: 'https://api.spotify.com/v1/me',
      headers: { Authorization: `Bearer ${accessToken}` },
      json: true
    };
    const userResponse = await request(meOptions);
    const { id: spotifyId } = userResponse;
    // User not constructor
    const user = new User({ spotifyId, accessToken, refreshToken });
    await user.save();
    return spotifyId;
  } catch (err) {
    return null;
  }
};

module.exports = {
  getAccessToken,
  callback
};
