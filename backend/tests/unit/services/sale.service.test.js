const sinon = require('sinon');
const { expect } = require('chai');

const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { mockSales, mockSaleById } = require('./mocks/sale.service.mock');

describe('Testando a camada service das vendas', function () {
  describe('a função findAll', function () {
    it('retorna a lista completa de vendas', async function () {
      sinon.stub(saleModel, 'findAll').resolves(mockSales);

      const result = await saleService.findAll();

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(mockSales);
    });
  });
  describe('a função findById', function () {
    it('retorna a venda com o id solicitado', async function () {
      sinon.stub(saleModel, 'findById').resolves(mockSaleById);

      const result = await saleService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(mockSaleById);
    });

    it('retorna um erro quando a venda não é encontrada', async function () {
      sinon.stub(saleModel, 'findById').resolves(undefined);

      const result = await saleService.findById(999);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Sale not found');
    });

    it('retorna um erro quando é passado um id inválido', async function () {
      const result = await saleService.findById('a');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.be.deep.equal('"id" must be a number');
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});