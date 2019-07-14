const { ProductsController } = require('./products.controller');


// Mock productService 
jest.mock('../services/products.service');
const { ProductsService } = require('../services/products.service');

const productMock = require('./product.mock.json');
describe("ProductsController", () => {
  describe("post", () => {
    it('should return a correctly product from ripley url', async () => {
      // Mock producto existe
      ProductsService.findByPartId.mockResolvedValue(productMock);
      const req = {
        app: {
          get: () => {
            return false;
          }
        },
        params: {
          sku: '000111'
        },
      };

      const res = {
        json: (data) => {
          return data;
        }
      };
      const response = await ProductsController.get(req, res);
      // console.log(response);
      expect(response.status.code).toBe(200);
      expect(response.body.uniqueID).toBe('12629483');
      expect(response.body.partNumber).toBe('2000374166508P');
    });

    it('should return a 404 for bad product', async () => {
      // Mock producto existe
      ProductsService.findByPartId.mockResolvedValue(null);
      const req = {
        app: {
          get: () => {
            return false;
          }
        },
        params: {
          sku: '000111'
        },
      };

      const res = {
        json: (data) => {
          return data;
        }
      };
      const response = await ProductsController.get(req, res);
      expect(response.status.code).toBe(404);
    });

    it('should return a correctly product from redis', async () => {
      const req = {
        app: {
          get: () => {
            return {
              getAsync: () => {
                return JSON.stringify(productMock);
              }
            }
          }
        },
        params: {
          sku: '000111'
        },
      };

      const res = {
        json: (data) => {
          return data;
        }
      };
      const response = await ProductsController.get(req, res);
      expect(response.status.code).toBe(200);
      expect(response.body.uniqueID).toBe('12629483');
      expect(response.body.partNumber).toBe('2000374166508P');
      expect(response.body.cache).toBe(true);
    });

  });
});
