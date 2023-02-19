/**
 * @api {delete} /products/:id delete a product
 * @apiName DeleteProduct
 * @apiGroup Proudct
 * @apiDescription حذف کردن کردن محصول
 *
 *
 * @apiParam {Number} id  product's unique ID
 *
 * @apiSuccessExample Success-Response
 *
 *  200 OK
 *
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
 *       ["محصول قبلا حذف شده است"]
 * }
 * @apiErrorExample Error-Response:500
 *
 * {
 *   "error":
 *       ["خطایی رخ داده است" ]
 * }
 */
