/**
 * @api {get} /invoices/:id invoice information
 * @apiName GetInvoice
 * @apiGroup Invoice
 * @apiDescription گرفتن اطلاعات یک فاکتور

 *
 * @apiParam {Number} id invoice's unique ID.
 *
 * @apiSuccess {Number} productId name of the Product
 * @apiSuccess {Number} pricePerOne  price of the Product
 * @apiSuccess {Number} amount  amount of the Product
 *
 *
 * @apiSuccessExample Success-Response
 *
 * {
 *   "productId":1,
 *   "pricePerOne":50000,
 *   "amount":10
 * }
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
 *       ["فاکتور یافت نشد"]
 * }
 *
 * @apiErrorExample Error-Response:500
 *
 * {
 *   "error":
 *       ["خطایی رخ داده است" ]
 * }
 */
