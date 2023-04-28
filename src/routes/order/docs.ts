/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: string
 *         postalCode:
 *           type: string
 *         trackingCode:
 *           type: string
 *         orderDate:
 *           type: string
 *         shippingDate:
 *           type: string
 *         shippingPriceCustomer:
 *           type: number
 *         shippingPriceSeller:
 *           type: number
 *         discount:
 *           type: number
 *         totalProfit:
 *           type: string
 *         sellFrom:
 *           type: string
 *         companyId:
 *           type: number
 *         id:
 *           type: number
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               orderId:
 *                 type: number
 *               productId:
 *                 type: number
 *               sellPrice:
 *                 type: number
 *               buyPrice:
 *                 type: number
 *               amount:
 *                 type: number
 *       example:
 *         id: 1
 *         name: fateme
 *         address: 221B baker street
 *         phone: 09123456789
 *         postalCode: 1234567890
 *         trackingCode: 1234567890123456
 *         orderDate: 020102
 *         shippingDate: 020103
 *         shippingPriceCustomer: 20
 *         shippingPriceSeller: 25
 *         discount: 2
 *         totalProfit: 23
 *         sellFrom: site
 *         companyId: 1
 *
 *
 */

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order Related Apis
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Orders]
 *     summary: new order
 *     description: add new order
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
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                     sellPrice:
 *                       type: number
 *                     amount:
 *                       type: number
 *             required:
 *               - products
 *               - shippingPriceCustomer
 *               - shippingPriceSeller
 *
 *             example:
 *               name: fateme
 *               address: 221B baker street
 *               phone: "09123456789"
 *               postalCode: "1234567890"
 *               trackingCode: "1234567890123456"
 *               orderDate: "020102"
 *               shippingDate: "020103"
 *               shippingPriceCustomer: 20
 *               shippingPriceSeller: 25
 *               discount: 2
 *               sellFrom: site
 *               products: [{productId: 3 , sellPrice: 800 , amount: 3}]
 *
 *     responses:
 *       200:
 *         description: Successful
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
