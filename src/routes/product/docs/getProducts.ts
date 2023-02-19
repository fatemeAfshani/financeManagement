/**
 * @api {get} /products products information
 * @apiName GetProducts
 * @apiGroup Proudct
 * @apiDescription گرفتن اطلاعات محصولات
 *
 * @apiQuery {Number} offset (optional default = 0)
 * @apiQuery {Number} limit  (optional default = 10)
 *
 * @apiSuccess {String} name name of the Product
 * @apiSuccess {Number} price  price of the Product
 * @apiSuccess {Number} amount  amount of the Product
 *
 *
 *
 *  @apiSuccessExample Success-Response
 *  [
 *      { id: 1, name: 'محصول جدید', price: 50000, amount: 10 },
 *      { id: 6, name: 'new', price: 0, amount: 0 },
 *      { id: 9, name: 'new2', price: 0, amount: 0 },
 *      { id: 10, name: 'new3', price: 0, amount: 0 },
 *      { id: 11, name: 'newd', price: 0, amount: 0 }
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
