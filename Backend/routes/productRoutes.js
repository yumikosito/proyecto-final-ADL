const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController.js');
const authentication = require('../middlewares/authentication')

router.get('/', productController.getFiltersController)
router.get('/max', productController.maxPriceController)
router.get('/buscar', productController.searchProductController)
// router.get('/filtros', productController.getFiltersController)
router.get('/mis-productos', authentication, productController.getMyProductsController)
router.post('/mis-productos/agregar', authentication, productController.newProductController)
router.get('/mis-productos/:idProducto', authentication, productController.getMyProductsByIdController)
router.put('/mis-productos/editar/:idProducto', authentication, productController.putMyProductsByIdController)
router.delete('/mis-productos/:idProducto', authentication, productController.deleteMyProductsByIdController)
router.get('/:id', productController.getProductByIdController)


module.exports = router

