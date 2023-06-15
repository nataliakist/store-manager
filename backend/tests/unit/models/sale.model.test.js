const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { saleModel } = require('../../../src/models');
const { mockSales, mockSaleById } = require('./mocks/sale.model.mock');

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
      sinon.stub(connection, 'execute').resolves([[mockSaleById]]);
      // act
      const result = await saleModel.findById(1);
      // assert
      expect(result).to.be.deep.equal(mockSaleById);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});