const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { saleModel } = require('../../../src/models');
const { mockSales, mockSaleById } = require('./mocks/sale.model.mock');
const { mockExpectedResponse } = require('./mocks/product.model.mock');

describe('Testando a camada model das vendas', function () {
  describe('a função findAll', function () {
    it('retorna com sucesso uma lista de vendas', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([mockSales]);
      // act
      const result = await saleModel.findAll();
      // assert
      expect(result).to.be.deep.equal(mockSales);
    });
  });

  describe('a função findById', function () {
    it('retorna com sucesso a venda solicitada', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([mockSaleById]);
      // act
      const result = await saleModel.findById(1);
      // assert
      expect(result).to.be.deep.equal(mockSaleById);
    });
  });

  describe('a função insert', function () {
    it('cadastra com sucesso uma nova venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await saleModel.insert(mockSaleById);

      expect(result).to.be.deep.equal(4);
    });
  });

  describe('a função deleteById', function () {
    it('cadastra com sucesso uma nova venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await saleModel.deleteById(1);

      expect(result).to.be.deep.equal(1);
    });
  });

  describe('a função updateQuantityById', function () {
    it('altera a quantidade do produto com sucesso', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([])
        .onSecondCall()
        .resolves([[{ date: new Date('2023-06-18') }]]);

      const result = await saleModel.updateQuantityById(1, 1, 2);

      expect(result).to.deep.equal(mockExpectedResponse);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});