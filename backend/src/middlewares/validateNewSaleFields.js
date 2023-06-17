const validateBody = (req, res, next) => {
  const sale = req.body;
  const message = { message: 'some field is missing' };

  if (!Array.isArray(sale) || sale.length < 1) return res.status(400).json(message);

  return next();
};

const validateFields = (req, res, next) => {
  const sale = req.body;
  const message = { message: 'some field is missing' };

  let error;
  sale.forEach((product) => {
    if (!product.productId || !product.quantity) {
      error = { status: 400, message };
    }
  });

  if (error) return res.status(error.status).json(error.message);
  return next();
};

module.exports = {
  validateBody,
  validateFields,
};