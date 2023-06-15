const { productService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listProducts = async (req, res) => {
  const { type, message } = await productService.findAll();
  if (type) return res.status(mapError(type)).json(message);

  res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  console.log(type);
  res.status(200).json(message);
};
 
module.exports = {
  listProducts,
  listProductById,
};