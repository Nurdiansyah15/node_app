const checkParamAvailable = (req, res, next) => {
  const { value } = req.params;
  next();
};
