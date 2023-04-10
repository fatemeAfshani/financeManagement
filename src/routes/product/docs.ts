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
 *         amount:
 *           type: number
 *         id:
 *           type: number
 *       example:
 *         name: "cloth1"
 *         price: 20.00
 *         amount: 10
 *         id: 1
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
 */

/**
 * @swagger
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
 *               amount:
 *                 type: number
 *             required:
 *               - name
 *               - price
 *               - amount
 *           example:
 *             name: "cloth 1"
 *             price: 30
 *             amount: 20
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
 *     parameters:
 *       - $ref: "#/components/parameters/limitQuery"
 *       - $ref: "#/components/parameters/offsetQuery"
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
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
