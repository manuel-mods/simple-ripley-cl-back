
const { ProductsController } = require('../controllers/products.controller');
module.exports = (app) => {
  app.get('/products/:sku' , ProductsController.get);
};
