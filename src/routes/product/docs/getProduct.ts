/**
 * @api {get} /products/:id product information
 * @apiName GetProduct
 * @apiGroup Proudct
 * @apiDescription گرفتن اطلاعات یک محصول

 *
 * @apiParam {Number} id product's unique ID.
 *
 * @apiSuccess {String} name name of the Product
 * @apiSuccess {Number} price  price of the Product
 * @apiSuccess {Number} amount  amount of the Product
 *
 *
 * @apiSuccessExample Success-Response
 *
 * {
 *   "id":1,
 *   "name":"محصول جدید",
 *   "price":50000,
 *   "amount":10
 * }
 *
 * @apiErrorExample Error-Response:400
 *
 * {
 *   "error":
 *       ["محصولی یافت نشد"]
 * }
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
 *       ["محصولی یافت نشد"]
 * }
 *
 * @apiErrorExample Error-Response:500
 *
 * {
 *   "error":
 *       ["خطایی رخ داده است" ]
 * }
 */
