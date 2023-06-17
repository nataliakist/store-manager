const validateBody = (req, res, next) => {
  const sale = req.body;
  const message = { message: 'body request is empty' };

  if (!Array.isArray(sale) || sale.length < 1) return res.status(400).json(message);

  return next();
};

const validateFields = (req, res, next) => {
  const sale = req.body;

  let error;
  sale.forEach((product) => {
    if (!product.productId) {
      error = { status: 400, message: '"productId" is required' };
    }
    if (product.quantity == null) {
      error = { status: 400, message: '"quantity" is required' };
    }
    if (product.quantity === 0) {
      error = {
        status: 422,
        message: '"quantity" must be greater than or equal to 1',
      };
    }
    if (error) return res.status(error.status).json({ message: error.message });
  });

  return next();
};

module.exports = {
  validateBody,
  validateFields,
};