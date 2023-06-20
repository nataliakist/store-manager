const express = require('express');
const { productRouter, saleRouter } = require('./routers');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);

app.use((error, _req, res, _next) => {
  res.status(error.status).json({ message: error.message });
});

module.exports = app;
