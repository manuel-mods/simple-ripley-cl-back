
const { ProductsController } = require('../controllers/products.controller');
module.exports = (app) => {
  app.get('api/v1/product/:sku' , ProductsController.get);
};
