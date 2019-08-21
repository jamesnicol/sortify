/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
module.exports.generateRandomString = length => {
  // @TODO change this
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  while (text.length < length) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
