/**
 * @swagger
 * tags:
 *   - name: ShareHolders
 *     description: Share holders Related Apis
 */

/**
 * @swagger
 * /shareHolders:
 *   post:
 *     tags: [ShareHolders]
 *     summary: add or update shareHolders
 *     description: add or update shareHolders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             users:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   isShareHolder:
 *                     type: boolean
 *                   sharePercent:
 *                     type: number
 *
 *             required:
 *               - users
 *
 *             example:
 *               users: [{id: 1 , isShareHolder: true , sharePercent: 20}]
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