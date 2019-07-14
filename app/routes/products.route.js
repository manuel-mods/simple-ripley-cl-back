
const { ProductsController } = require('../controllers/products.controller');
module.exports = (app) => {
  app.get('/v1/product/:sku' , ProductsController.get);
};
