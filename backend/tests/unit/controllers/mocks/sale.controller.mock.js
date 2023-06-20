const mockSales = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const mockSaleById = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const mockNewSale = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 2,
  },
];

const mockNewSaleResolve = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    },
    {
      productId: 2,
      quantity: 2,
    },
  ],
};

const mockNewSaleError = {
  id: 4,
  itemsSold: [
    {
      quantity: 2,
    },
  ],
};

const mockNewSaleQuantity = {
  date: '2023-06-14T01:06:16.000Z',
  productId: '1',
  quantity: 2,
  saleId: '1',
};

const productIdError = {
  message: '"productId" is required',
};

module.exports = {
  mockSales,
  mockSaleById,
  mockNewSale,
  mockNewSaleResolve,
  mockNewSaleError,
  mockNewSaleQuantity,
  productIdError,
};