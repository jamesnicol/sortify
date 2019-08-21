const request = require('request-promise');
// requesting access token from refresh token
const getAccessToken = async refreshToken => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic }`
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    resolveWithFullResponse: true,
    json: true
  };

  try {
    const resp = await request.post(authOptions);
    if (response.statusCode === 200) {
      const { access_token: accessToken } = body;
    }
  } catch (e) {
    
  }
};

module.exports = {
  getAccessToken
};
