/**
 * @api {post} /products/:id update a product
 * @apiName UpdateProduct
 * @apiGroup Proudct
 * @apiDescription آپدیت کردن محصول
 *
 *
 * @apiParam {Number} id  product's unique ID
 * @apiBody {String} name name of the Product (optional)
 * @apiBody {Number} price  price of the Product (optional)
 * @apiBody {Number} amount  amount of the Product (optional)
 *
 *
 * @apiSuccessExample Success-Response
 *
 *  200 OK
 *
 * @apiErrorExample Error-Response:400
 *
 * {
 *   "error":
 *       ["نام محصول تکراری است"]
 * }
 *
 * {
 *   "error":
 *       ["شناسه محصول معتبر نیست"]
 * }
 *
 * {
 *   "error":
 *       ["نام معتبر نیست"]
 * }
 *
 * {
 *   "error":
 *       ["مبلغ معتبر نیست"]
 * }
 *
 * {
 *   "error":
 *       ["تعداد معتبر نیست"]
 * }
 *
 * @apiErrorExample Error-Response:404
 *
 * {
 *   "error":
 *       ["محصولی یافت نشد"]
 * }
 * @apiErrorExample Error-Response:500
 *
 * {
 *   "error":
 *       ["خطایی رخ داده است" ]
 * }
 */
