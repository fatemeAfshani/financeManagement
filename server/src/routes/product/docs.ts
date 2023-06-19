/**
 * @swagger
 * components:
 *   schemas:
 *     GeneralError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *       example:
 *         error: error happened
 *
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         id:
 *           type: number
 *         companyId:
 *           type: number
 *         isDeleted:
 *           type: boolean
 *       example:
 *         name: "cloth1"
 *         price: 20.00
 *         id: 1
 *         companyId: 1
 *         isDeleted: false
 *
 *
 *   parameters:
 *     idParam:
 *       name: id
 *       in: path
 *       description:  Numberic id
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *
 *     limitQuery:
 *       name: limit
 *       in: query
 *       description:  amount of data you want to be returned
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 1
 *
 *     offsetQuery:
 *       name: offset
 *       in: query
 *       description: from whitch page you want data to be returned
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 0
 *
 *     forUserQuery:
 *       name: forUser
 *       in: query
 *       description: if true returns incomes of user otherwise it returns incomes of company
 *       required: false
 *       schema:
 *         type: boolean
 *
 *
 *     idQuery:
 *       name: id
 *       in: query
 *       description: if exist returns data of this user otherwise it returns data of company
 *       required: false
 *       schema:
 *         type: number
 *
 *     fromDateQuery:
 *       name: fromDate
 *       in: query
 *       description: from whitch date you want data to be returned
 *       required: false
 *       schema:
 *         type: string
 *
 *     toDateQuery:
 *       name: toDate
 *       in: query
 *       description: to whitch date you want data to be returned
 *       required: false
 *       schema:
 *         type: string
 *
 *     onlyNotSettledQuery:
 *       name: onlyNotSettled
 *       in: query
 *       description: return only if income is not settled
 *       required: false
 *       schema:
 *         type: boolean
 *
 *     nameQuery:
 *       name: name
 *       in: query
 *       description: name of product we want to search
 *       required: true
 *       schema:
 *         type: string
 *
 *     periodQuery:
 *       name: period
 *       in: query
 *       description: in which period we want data to be
 *       required: true
 *       schema:
 *         type: string
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product Related Apis
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: new product
 *     description: Make new Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *             required:
 *               - name
 *               - price
 *           example:
 *             name: "cloth 1"
 *             price: 30
 *     responses:
 *       200:
 *         description: Successful
 *
 *       401:
 *         description: unAuthorized
 *
 *       403:
 *         description: forbidden
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
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
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Returns all of products
 *     description: Returns all of products
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
 *               type: object
 *               properties:
 *                 products:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     id:
 *                       type: number
 *                     companyId:
 *                       type: number
 *                     isDeleted:
 *                       type: boolean
 *                     amount:
 *                       type: number
 *                 productsCount:
 *                   type: number
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
 *       403:
 *         description: forbidden
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
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Returns a product
 *     description: Returns data of one product
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
 *               $ref: "#/components/schemas/Product"
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
 *       403:
 *         description: forbidden
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
 * /products/{id}:
 *   post:
 *     tags: [Products]
 *     summary: update product
 *     description: update a Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *
 *           example:
 *             name: "cloth 1"
 *             price: 30
 *     responses:
 *       200:
 *         description: Successful
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
 *       403:
 *         description: forbidden
 *
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
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
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: delete product
 *     description: delete a Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Successful
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
 *       403:
 *         description: forbidden
 *
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
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
 * /products/search/name:
 *   get:
 *     tags: [Products]
 *     summary: search in products
 *     description: Returns 15 product that their name is like name query
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/nameQuery"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   $ref: "#/components/schemas/Product"
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
 *       403:
 *         description: forbidden
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
