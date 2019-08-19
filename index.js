const { PORT } = require('./config');

const app = require('./src/app');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});
