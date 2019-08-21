const { PORT } = require('./config');

const app = require('./src/app');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
