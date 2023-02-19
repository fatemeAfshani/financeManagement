/**
 * @api {post} /invoices add new invoice
 * @apiName PostInvoice
 * @apiGroup Invoice
 * @apiDescription اضافه کردن فاکتور جدید
 *
 *
 * @apiBody {Number} productId unique id of product
 * @apiBody {Number}  pricePerone  price per Product
 * @apiBody {Number} amount  amount of Product
 *
 *
 * @apiSuccessExample Success-Response
 *
 *  200 OK
 *
 * @apiErrorExample Error-Response:400
 *
 *
 * {
 *   "error":
 *       ["شناسه محصول معتبر نیست"]
 * }
 *
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
