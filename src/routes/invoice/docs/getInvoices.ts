/**
 * @api {get} /invoices invoices information
 * @apiName GetInvoices
 * @apiGroup Invoice
 * @apiDescription گرفتن فاکتور های محصولات
 *
 * @apiQuery {Number} offset (optional default = 0)
 * @apiQuery {Number} limit  (optional default = 10)
 *
 * @apiSuccess {Number} productId name of the Product
 * @apiSuccess {Number} pricePerOne  price of the Product
 * @apiSuccess {Number} amount  amount of the Product
 *
 *
 *
 *  @apiSuccessExample Success-Response
 *  [
 *      { productId: 6, pricePerOne: 0, amount: 0 },
 *      { productId: 9,  pricePerOne: 0, amount: 0 },
 *      { productId: 10,  pricePerOne: 0, amount: 0 },
 *      { productId: 11,  pricePerOne: 0, amount: 0 }
 *  ]
 *
 *
 *
 *  @apiErrorExample Error-Response:400
 *
 *    {
 *      "error":
 *         ["limit معتبر نیست"]
 *    }
 *
 *    {
 *      "error":
 *         ["offsest معتبر نیست"]
 *    }
 *
 * @apiErrorExample Error-Response:500
 *
 * {
 *   "error":
 *       ["خطایی رخ داده است" ]
 * }
 */
