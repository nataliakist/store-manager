module.exports = (req, _res, next) => {
  const { quantity } = req.body;
  
  let error;
  
  if (quantity === undefined) {
    error = { status: 400, message: '"quantity" is required' };
  }
  if (quantity < 1) {
    error = {
      status: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  if (error) return next(error);
  
  return next();
};