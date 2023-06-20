const validId = 1;

const validName = 'Cedro do Loki';

const mockProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const newProductMockDB = {
  name: 'Cetro do Loki',
};

const mockProductResponse = {
  id: 1,
  name: 'Cetro do Loki',
};

const mockExpectedResponse = {
  date: '2023-06-18T00:00:00.000Z',
  productId: 1,
  quantity: 2,
  saleId: 1,
};

module.exports = {
  mockProducts,
  mockProductResponse,
  mockExpectedResponse,
  newProductMockDB,
  validId,
  validName,
};