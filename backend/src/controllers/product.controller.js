const { productService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listProducts = async (req, res) => {
  const { type, message } = await productService.findAll();
  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createNewProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.insert(name);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};
 
module.exports = {
  listProducts,
  listProductById,
  createNewProduct,
};