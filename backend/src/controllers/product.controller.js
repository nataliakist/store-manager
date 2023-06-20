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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateById(id, name);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).json();
};

const getProductByQuery = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productService.getByQuery(q);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};
 
module.exports = {
  listProducts,
  listProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductByQuery,
};