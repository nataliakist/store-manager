const { saleModel } = require('../models');
const schema = require('./validations/validationInputValues');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const sale = await saleModel.findById(id); 
  if (!sale || sale.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const insert = async (sale) => {
  const saleId = await saleModel.insert(sale);
  const result = { id: +saleId, itemsSold: sale };

  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  insert,
};