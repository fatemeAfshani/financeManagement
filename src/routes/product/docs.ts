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
 *     Subscription:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *       example:
 *         name: "vm1"
 *         price: 2000
 */

/**
 * @swagger
 *   parameters:
 *     idParam:
 *       name: id
 *       in: path
 *       description:  Numberic id of subscription
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
 *     isActiveQuery:
 *       name: isActive
 *       in: query
 *       description: only return active/deactive customer subscriptions
 *       required: false
 *       schema:
 *         type: boolean
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
 * /customer/register:
 *   post:
 *     tags: [Customers]
 *     summary: Returns username and credit
 *     description: Customer registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: password must be min 3 character
 *               credit:
 *                 type: number
 *                 description: initial customer credit
 *             required:
 *               - username
 *               - password
 *           example:
 *             username: "fateme"
 *             password: "123"
 *             credit: 20
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 credit:
 *                   type: number
 *             example:
 *               username: "fateme"
 *               credit: 20
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
 * /customer/login:
 *   post:
 *     tags: [Customers]
 *     summary: Returns username and token
 *     description: Customer login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: password must be min 3 character
 *             required:
 *               - username
 *               - password
 *           example:
 *             username: "fateme"
 *             password: "123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               username: "fateme"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       401:
 *         description: Authorization information is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "invalid login"
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
