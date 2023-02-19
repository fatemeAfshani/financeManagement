/**
 * @api {post} /products add new product
 * @apiName PostProduct
 * @apiGroup Proudct
 * @apiDescription اضافه کردن محصول جدید
 *
 *
 * @apiBody {String} name name of the Product
 * @apiBody {Number} price  price of the Product
 * @apiBody {Number} amount  amount of the Product
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
 * @apiErrorExample Error-Response:500
 *
 * {
 *   "error":
 *       ["خطایی رخ داده است" ]
 * }
 */
