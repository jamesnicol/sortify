module.exports = (req, res, next) => {
  const notFound = () => {
    res.status(404).json();
  };

  const serverError = (err) => {
    res.status(500).json(err);
  };

  Object.assign(res, {notFound, serverError});

  next();
};
