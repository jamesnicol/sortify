const request = require('request-promise');
// requesting access token from refresh token
const getAccessToken = async refreshToken => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${3}`
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

const callback = async () => {

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
        return false;
      }
    });
  }
}

module.exports = {
  getAccessToken
};
