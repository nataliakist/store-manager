const { productService } = require('../services');

const listProducts = async (req, res) => {
  const { type, message } = await productService.findAll();
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
};
 
module.exports = {
  listProducts,
};