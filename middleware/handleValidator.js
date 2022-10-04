const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      res.status(400).json({ message: error.message });
    }
    next();
  };
};

module.exports = validatorHandler;
