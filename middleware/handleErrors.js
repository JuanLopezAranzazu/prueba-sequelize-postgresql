const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).send({ error: "Invalid request body" }),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: (res) =>
    res.status(401).json({ error: "Token missing or invalid" }),

  TokenExpirerError: (res) => res.status(401).json({ error: "Token expired" }),

  defaultError: (res, error) => {
    console.error(error.name);
    res.status(500).end();
  },
};

module.exports = (error, request, response, next) => {
  console.log(error);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(response, error);
};
