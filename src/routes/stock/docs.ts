/**
 * @swagger
 * components:
 *   schemas:
 *     ProductStock:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *         buyPrice:
 *           type: number
 *         amount:
 *           type: number
 *         id:
 *           type: number
 *       example:
 *         productId: 1
 *         buyPrice: 20.00
 *         amount: 10
 *         id: 2
 *
 */

/**
 * @swagger
 * tags:
 *   - name: Stocks
 *     description: product-stock Related Apis
 */

/**
 * @swagger
 * /stocks/product/{id}:
 *   get:
 *     tags: [Stocks]
 *     summary: Returns stocks of one product
 *     description: Returns all of stocks for one product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stocks:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     buyPrice:
 *                       type: number
 *                     amount:
 *                       type: number
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     id:
 *                       type: number
 *
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       401:
 *         description: unAuthorized
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */

/**
 * @swagger
 * /stocks:
 *   get:
 *     tags: [Stocks]
 *     summary: Returns all of stocks
 *     description: Returns all stocks of a company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/limitQuery"
 *       - $ref: "#/components/parameters/offsetQuery"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductStock"
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       401:
 *         description: unAuthorized
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
