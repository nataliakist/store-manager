const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id`,
  );
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?`,
    [id],
  );
  return result;
};

const insert = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (date(now()))',
  );

  if (!insertId) return { type: 'INVALID_VALUE', message: 'something is wrong' };

  const result = sale.map((product) => connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [insertId, product.productId, product.quantity],
  ));

  await Promise.all(result);

  if (!result || result.length === 0) {
    return { type: 'INVALID_VALUE', message: 'something is wrong' };
  }
  
  return insertId;
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteById,
};