/**
 * @api {get} /invoices/product/:id invoices information of a product
 * @apiName GetProductInvoices
 * @apiGroup Invoice
 * @apiDescription گرفتن اطلاعات فاکتور های یک محصول

 *
 * @apiParam {Number} id product's unique ID.
 *
 * @apiSuccess {Number} productId name of the Product
 * @apiSuccess {Number} pricePerOne  price of the Product
 * @apiSuccess {Number} amount  amount of the Product
 *
 *
 * @apiSuccessExample Success-Response
 *
 * [
 *  {
 *      "productId":1,
 *      "pricePerOne":50000,
 *      "amount":10
 *  },
 *  {
 *      "productId":1,
 *      "pricePerOne":50000,
 *      "amount":20
 *  }
 * ]
 *
 * @apiErrorExample Error-Response:400
 *
 * {
 *   "error":
 *       ["شناسه محصول معتبر نیست"]
 * }
 *
 * @apiErrorExample Error-Response:404
 *
 * {
 *   "error":
 *       ["فاکتوری برای این محصول یافت نشد"]
 * }
 *
 * @apiErrorExample Error-Response:500
 *
 * {
 *   "error":
 *       ["خطایی رخ داده است" ]
 * }
 */
