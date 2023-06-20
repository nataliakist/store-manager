const { saleService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listSales = async (req, res) => {
  const { type, message } = await saleService.findAll();
  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createNewSale = async (req, res) => {
  const sale = req.body;

  const { type, message } = await saleService.insert(sale);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.deleteById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).json();
};

const updateSaleQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { type, message } = await saleService.updateQuantityById(saleId, productId, quantity);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};
 
module.exports = {
  listSales,
  listSaleById,
  createNewSale,
  deleteSale,
  updateSaleQuantity,
};