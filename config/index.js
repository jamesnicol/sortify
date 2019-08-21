module.exports = {
  PORT: process.env.PORT || 3000,
  DB_PATH: process.env.DB_PATH || 'mongodb://localhost/sortify',
  REDIRECT_URL: process.env.REDIRECT_URL || 'http://localhost:3000/callback',
  COOKIE_STATE_KEY: 'spotify_auth_state',
  SPOTIFY_SCOPE: 'user-read-private user-read-email',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || '',
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || ''
};
