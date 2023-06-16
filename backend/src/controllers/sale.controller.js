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
 
module.exports = {
  listSales,
  listSaleById,
};