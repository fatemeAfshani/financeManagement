/**
 * @swagger
 * components:
 *   schemas:
 *     ShareHolderCheckout:
 *       type: object
 *       properties:
 *         companyId:
 *           type: number
 *         amount:
 *           type: number
 *         description:
 *           type: string
 *         userId:
 *           type: number
 *         date:
 *           type: string
 *         id:
 *           type: number
 *       example:
 *         id: 1
 *         comapnyId: 1
 *         amount: 221
 *         description: "this is just test"
 *         userId: 1
 *         date: "020216"
 */

/**
 * @swagger
 * tags:
 *   - name: Checkouts
 *     description: shareholder checkout Related Apis
 */

/**
 * @swagger
 * /checkouts:
 *   post:
 *     tags: [Checkouts]
 *     summary: new checkout
 *     description: add new checkout
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               userId:
 *                 type: number
 *               incomeIds:
 *                 type: array
 *                 items:
 *                   type: number
 *             required:
 *               - amount
 *               - description
 *               - incomeIds
 *
 *             example:
 *               amount: 349.95
 *               description: "test description"
 *               userId: 1
 *               incomeIds: [12]
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: number
 *             example:
 *               orderId: 1
 *       401:
 *         description: unAuthorized
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
 * /orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Returns one order
 *     description: Returns data of one order
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
 *               $ref: "#/components/schemas/Order"
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
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: Returns all of orders
 *     description: Returns all orders of a company
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
 *               $ref: "#/components/schemas/Order"
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
 * /orders/product/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Returns orders of one product
 *     description: Returns all of orders for one product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/limitQuery"
 *       - $ref: "#/components/parameters/offsetQuery"
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
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
 * /orders/{id}:
 *   post:
 *     tags: [Orders]
 *     summary: update order
 *     description: update a Order
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
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               trackingCode:
 *                 type: string
 *               orderDate:
 *                 type: string
 *               shippingDate:
 *                 type: string
 *               shippingPriceCustomer:
 *                 type: number
 *               shippingPriceSeller:
 *                 type: number
 *               discount:
 *                 type: number
 *               sellFrom:
 *                 type: string
 *
 *           example:
 *             name: fateme
 *             address: 221B baker street
 *             phone: "09123456789"
 *             postalCode: "1234567890"
 *             trackingCode: "1234567890123456"
 *             orderDate: "020102"
 *             shippingDate: "020103"
 *             shippingPriceCustomer: 20
 *             shippingPriceSeller: 25
 *             discount: 2
 *             sellFrom: site
 *
 *
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
