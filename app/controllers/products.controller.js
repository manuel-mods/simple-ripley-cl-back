const { ProductsService } = require('../services/products.service');
const { logger } = require('../logger');

class ProductsController {
  constructor() {

  }
  static async get(req, res) {
    try {
      // Instanciamos redis
      const redis = req.app.get('redis');
      const sku = req.params.sku;
      let productData = null;
      let checkRedis = false;
      // Verificamos si el sku esta en redis
      if(redis) {
        checkRedis = await redis.getAsync(sku);
      }
      if(!checkRedis) {
        // Se carga producto desde simple.ripley.cl
        productData = await ProductsService.findByPartId(sku);

        // Si producto no existe error 404
        if(!productData) {
          throw 404;
        }
        if(redis) {
          // Se guarda producto en redis
          redis.set(sku, JSON.stringify(productData), 'EX', 60);
          logger.info(`products ${sku} load from url`);
        }
      } else {
        // Si producto existe en redis se obtiene 
        productData = JSON.parse(checkRedis.toString());
        productData.cache = true;
        logger.info(`products ${sku} load from redis`);
      }
      return res.json(createResponse(productData, 200));
    } catch(e) {
      return res.json(createResponse(null, e));
    }
  };
}


function createResponse(data, code){
  let message = 'success';
  if(code != 200) {
    message = 'error';
  }
  const body = data;
  return {
    body: body,
    status: {
      message: message,
      code: code
    }
  }
} 


module.exports = {
  ProductsController
}
