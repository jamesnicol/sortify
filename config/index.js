module.exports = {
  PORT: process.env.PORT || 3000,
  DB_PATH: process.env.DB_PATH || 'mongodb://localhost/sortify',
  COOKIE_STATE_KEY: 'spotify_auth_state',
  COOKIE_USER_KEY: 'user_cookie',
  SPOTIFY_SCOPE: 'user-read-private user-read-email user-read-private',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_ENDPOINT: process.env.REDIRECT_URI || '/auth/callback'
};
