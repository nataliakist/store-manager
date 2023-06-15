const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id`,
  );
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?`,
    [id],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
};