const { productModel } = require('../models');
const schema = require('./validations/validationInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const product = await productModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const insert = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateById = async (id, name) => {
  const error = await schema.validateInputValues(id, name);
  if (error.type) return error;

  await productModel.updateById(id, name);
  const product = await productModel.findById(id);

  return { type: null, message: product };
};

const deleteById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const product = await productModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.deleteById(id);

  return { type: null };
};

const getByQuery = async (query) => {
  const products = await productModel.findAll();

  if (!query) return { type: null, message: products };

  const filteredProducts = products.filter((product) => product.name.includes(query));

  return { type: null, message: filteredProducts };
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
  getByQuery,
};