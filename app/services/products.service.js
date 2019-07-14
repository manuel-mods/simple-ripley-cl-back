const axios = require('axios');
const ripleyUrl = "https://simple.ripley.cl/api/v2/products/"
const {logger} = require('../logger');

class ProductsService {
  static async findByPartId(id) {
    const urlProduct = ripleyUrl + id;
    try {
      // Random para error del 10%
      let random = Math.random();
      if(random  < 0.11) {
        logger.error('error forzado 10%');
        throw new Error();
      }
      // Si no tiene error forzado se llama la url con axios
      const productData =  await callUrl(urlProduct);
      logger.info('success call ' + urlProduct);
      return productData;
    }
    catch (err) {
      logger.error('error call ' + urlProduct + ' try again...');
      return await this.findByPartId(id);
    }
  };
}

async function callUrl (urlProduct) {
  try {
    response = await axios.get(urlProduct);
    responseData = response.data;
  } catch (err) {
    responseData = null;
  } finally {
    return responseData;
  }
}

module.exports = {
  ProductsService
}