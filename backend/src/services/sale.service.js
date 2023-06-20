const { saleModel, productModel } = require('../models');
const schema = require('./validations/validationInputValues');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const sale = await saleModel.findById(id); 
  if (!sale || sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const insert = async (sale) => {
  const productsPromise = sale.map((product) => saleModel.findById(product.productId));
  
  const productsResult = await Promise.all(productsPromise);

  for (let index = 0; index < productsResult.length; index += 1) {
    if (productsResult[index].length === 0) {
      return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }
  }
  
  const saleId = await saleModel.insert(sale);
  const result = { id: +saleId, itemsSold: sale };

  return { type: null, message: result };
};

const deleteById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const sale = await saleModel.findById(id);

  if (!sale || sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await saleModel.deleteById(id);

  return { type: null };
};

const updateQuantityById = async (saleId, productId, quantity) => {
  const sale = await saleModel.findById(saleId);
  if (!sale[1]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found in sale' };

  const result = await saleModel.updateQuantityById(saleId, productId, quantity);

  console.log(result);

  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteById,
  updateQuantityById,
};